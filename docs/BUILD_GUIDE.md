# Building Insight AI for Distribution

## Quick Build Commands

### Windows Installer (.exe)
```bash
npm run build:win
```
**Output:** `dist/Insight AI Setup.exe`

### macOS Installer (.dmg)
```bash
npm run build:mac
```
**Output:** `dist/Insight AI.dmg`

### Both Platforms
```bash
npm run build:all
```

### Test Build (No Installer)
```bash
npm run pack
```

---

## Prerequisites

### All Platforms
- Node.js 18+ installed
- All dependencies installed (`npm install`)

### Windows Builds
- Can build on Windows, macOS (with Wine), or Linux
- Icon required: `build/icon.ico` (256x256px)

### macOS Builds  
- **Must build on macOS** (Electron limitation)
- Icon required: `build/icon.icns` (512x512px)
- Optional: Apple Developer account for code signing

---

## App Icons

### Creating Icons

**Option 1: Use existing logo**
Place your Insight AI logo in the `build` directory as:
- `build/icon.ico` for Windows
- `build/icon.icns` for macOS

**Option 2: Auto-generate from PNG**
```bash
# Install icon generator
npm install --global electron-icon-maker

# Generate from 1024x1024 PNG
electron-icon-maker --input=logo.png --output=build
```

**Option 3: Online converters**
- [iConvert Icons](https://iconverticons.com/online/)
- [CloudConvert](https://cloudconvert.com/)

---

## Build Output

After running build commands, check the `dist` folder:

```
dist/
├── Insight AI Setup.exe       # Windows installer
├── Insight AI.dmg             # macOS disk image
└── win-unpacked/              # Unpacked Windows files (for testing)
```

### Installer Features

**Windows NSIS Installer:**
- ✅ Custom installation directory
- ✅ Desktop shortcut creation
- ✅ Start Menu entry
- ✅ Uninstaller included

**macOS DMG:**
- ✅ Drag-and-drop installation
- ✅ Applications folder alias
- ✅ Custom background (configurable)

---

## Code Signing (Optional)

### Why Sign?
- **Windows:** Reduces SmartScreen warnings
- **macOS:** Required for Gatekeeper approval

### Windows Code Signing
```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "your-password"
}
```

### macOS Code Signing
Requires Apple Developer account ($99/year):
```bash
# Sign and notarize
npm run build:mac
```

---

## Distribution

### GitHub Releases (Recommended)
1. Create GitHub Release
2. Upload `Insight AI Setup.exe` and `Insight AI.dmg`
3. Add release notes
4. Tag version (e.g., `v1.0.0`)

### Direct Download
Host installers on your own server or cloud storage.

---

## Troubleshooting

### "Icon not found" Error
Create `build` directory and add icons:
```bash
mkdir build
# Add icon.ico and icon.icns to build/
```

### Build Fails on Windows
- Ensure long path support is enabled
- Run terminal as Administrator

### macOS Build on Non-Mac
Not possible. macOS builds require macOS hardware or VM.

### Large File Size (~150-200MB)
Normal! Electron bundles Chromium runtime. Consider:
- Using ASAR archive (automatic)
- Excluding unnecessary node_modules

---

## Version Updates

Update version in `package.json`:
```json
{
  "version": "1.0.0"  // Increment for new releases
}
```

Version auto-populates in:
- Installer metadata  
- About screen
- Window title

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Build Releases
on:
  push:
    tags:
      - 'v*'

jobs:
  build-win:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build:win
      
  build-mac:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build:mac
```

---

## Quick Reference

| Command | Platform | Output |
|---------|----------|--------|
| `npm run dev` | Development | Electron dev server |
| `npm run build` | All | Vite build only |
| `npm run build:win` | Windows | `.exe` installer |
| `npm run build:mac` | macOS | `.dmg` installer |
| `npm run build:all` | Both | Both installers |
| `npm run pack` | Test | Unpacked app folder |
