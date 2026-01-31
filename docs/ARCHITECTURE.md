# Architecture Overview

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Framer Motion** - Animations and transitions
- **Vite** - Build tool and dev server

### Backend/Desktop
- **Electron** - Desktop application framework
- **Node.js** - Runtime environment
- **systeminformation** - Hardware detection library

### Key Libraries
- `systeminformation` - Cross-platform hardware detection
- `framer-motion` - Smooth animations and page transitions

## Application Structure

```
llm-model-eligibility-checker/
├── electron/
│   ├── main.js              # Electron main process
│   └── preload.js           # IPC bridge (security layer)
├── src/
│   ├── components/
│   │   ├── InputScreen.jsx        # User input form
│   │   ├── ScanningScreen.jsx     # Hardware scanning UI
│   │   ├── ResultsScreen.jsx      # Recommendations display
│   │   ├── AboutScreen.jsx        # About page
│   │   └── TutorialScreen.jsx     # Tutorial/help page
│   ├── services/
│   │   ├── recommendationEngine.js    # Core algorithm
│   │   └── hardwareValidator.js       # Input validation
│   ├── data/
│   │   └── models.json            # LLM model database
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # React entry point
├── docs/                          # Documentation
└── package.json                   # Dependencies
```

## Component Flow

### 1. InputScreen
**Purpose**: Collect user's system information and usage intent

**Inputs**:
- Device type (laptop/desktop)
- Manufacturer and model
- Processor architecture (Intel/AMD or Apple Silicon)
- Primary usage intent (chat, dev, creative, data, vision)

**Validation**:
- Required field checks
- Manufacturer/processor mismatch detection
- Anti-impersonation validation (compares input vs detected hardware)

**Output**: Form data → ScanningScreen

### 2. ScanningScreen  
**Purpose**: Scan hardware and display real-time component detection

**Process**:
1. Calls `window.electronAPI.scanSystem()` via IPC
2. Electron main process uses `systeminformation` library
3. Detects: CPU, RAM, GPU, VRAM, Storage
4. Updates UI with real-time component status:
   - ○ Pending (gray)
   - 🔄 Scanning (blue, animated)
   - ✓ Success (green)
   - ⚠️ Warning (yellow)
   - ✗ Error (red)

**Output**: Hardware data → recommendationEngine

### 3. Recommendation Engine
**Purpose**: Analyze hardware and categorize models

**Algorithm**:
```
For each model in database:
  1. Filter by user intent (vision, chat, dev, etc.)
  2. Check hardware requirements:
     - Apple Silicon: Check unified memory (80% usable)
     - Windows Desktop: Check VRAM (1.4x headroom for best)
     - Windows Laptop: Check VRAM (1.6x headroom for best, thermal penalty)
     - CPU-only: Only recommend tiny models (<8GB VRAM)
  3. Categorize as Best/Good/Bad
  4. Generate fit reason explaining the rating
  5. Sort by model size within each category
```

**See**: `docs/RECOMMENDATION_ENGINE.md` for detailed algorithm

### 4. ResultsScreen
**Purpose**: Display categorized model recommendations

**Display**:
- Hardware specifications summary
- Best Models (green) - Excellent performance expected
- Good Models (yellow) - Good performance expected
- Bad Models (red) - Poor performance or not recommended

Each model shows:
- Model name and size
- Quantization level
- Fit reason (why it's in that category)
- Tags (use case indicators)

## IPC Communication

### Security Model
- **Context Isolation**: Enabled (renderer can't access Node.js directly)
- **Node Integration**: Disabled (prevents direct Node.js execution)
- **Preload Script**: Exposes only specific APIs to renderer

### IPC Bridge (preload.js)

```javascript
contextBridge.exposeInMainWorld('electronAPI', {
  scanSystem: () => ipcRenderer.invoke('scan-system')
});
```

### IPC Handler (main.js)

```javascript
ipcMain.handle('scan-system', async () => {
  const cpu = await si.cpu();
  const mem = await si.mem();
  const graphics = await si.graphics();
  const diskLayout = await si.diskLayout();
  
  return {
    status: 'success',
    data: { cpu, mem, graphics, diskLayout }
  };
});
```

## Data Flow

```
User Input Form
       ↓
Input Validation
       ↓
Scanning Screen
       ↓
IPC: invoke('scan-system')
       ↓
Electron Main Process
       ↓
systeminformation library
       ↓
Hardware Data (CPU, RAM, GPU, VRAM, Storage)
       ↓
IPC: return to renderer
       ↓
Recommendation Engine
       ↓
Model Database (models.json)
       ↓
Filtering & Scoring Algorithm
       ↓
Categorized Models (Best/Good/Bad)
       ↓
Results Screen
       ↓
User views recommendations
```

## Hardware Detection Details

### Apple Silicon Detection
```javascript
const isAppleSilicon = cpu.manufacturer.includes('Apple');
```

### VRAM Detection
```javascript
const vramGB = graphics.controllers.reduce(
  (acc, gpu) => acc + (gpu.vram || 0), 
  0
) / 1024;
```

### Desktop vs Laptop
User-specified in form (no reliable programmatic detection)

## Model Database Schema

```json
{
  "id": "unique-model-id",
  "name": "Display Name",
  "family": "Model Family",
  "size_params": "7B",
  "quantization": "Q4_K_M",
  "req_vram_gb": 8,
  "req_ram_gb": 12,
  "description": "Model description",
  "tags": ["chat", "general"],
  "min_score": 30
}
```

## Performance Considerations

### Optimization Strategies
1. **No External API Calls**: Everything runs locally
2. **Fast Hardware Detection**: ~2-5 seconds scan time
3. **Efficient Filtering**: O(n) model database iteration
4. **React Memo**: Prevents unnecessary re-renders
5. **Lazy Loading**: Components load on demand

### Memory Usage
- **Typical**: 100-200 MB RAM
- **Peak (during scan)**: ~300 MB RAM

## Security Features

### Privacy
- ✅ 100% offline operation
- ✅ No telemetry or analytics
- ✅ No data leaves the device
- ✅ No external network requests

### Input Validation
- ✅ Anti-impersonation checks
- ✅ Hardware mismatch detection
- ✅ Required field validation
- ✅ XSS prevention (React escapes by default)

### Electron Security
- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Content Security Policy (CSP)
- ✅ Preload script sandboxing

## Future Enhancements

Planned features:
- Model details modal with links to HuggingFace
- Export results to PDF/JSON
- Expected inference speed estimates
- Windows/macOS production installers
- Code signing for distribution
- Auto-update mechanism
