# Recommendation Engine - Technical Documentation

## Overview
The recommendation engine uses **evidence-based, hardware-aware scoring** to categorize LLM models into Best/Good/Bad fit based on your actual system capabilities.

## Architecture Detection

### Apple Silicon (M1/M2/M3/M4)
**Unified Memory Architecture**
- GPU, Neural Engine, and CPU share the same RAM pool
- More memory-efficient than discrete GPU systems
- **80% of total RAM** is usable for models (macOS is efficient)
- No separate VRAM - everything uses unified memory

**Scoring Logic:**
- **Best**: Model RAM requirement × 1.6 ≤ Available RAM (60% headroom)
- **Good**: Model RAM requirement × 1.2 ≤ Available RAM (20% headroom)  
- **Bad**: Model RAM requirement ≤ Available RAM (minimal headroom, will be slow)
- **Skipped**: Can't fit in memory

### Windows/Linux with NVIDIA GPU

**Discrete GPU Architecture**
- Separate VRAM (GPU memory) and System RAM
- Models load into VRAM for fast inference
- Falls back to RAM when VRAM is insufficient (very slow)

#### Desktop Systems
**Sustained Performance** - No thermal constraints

**Scoring Logic:**
- **Best**: VRAM ≥ Model VRAM requirement × 1.4 (40% headroom)
- **Good**: VRAM ≥ Model VRAM requirement × 1.15 (15% headroom)
- **Bad**: VRAM ≥ Model VRAM requirement (minimal headroom) OR RAM ≥ Model RAM + 8GB (offloading)
- **Skipped**: Insufficient resources

#### Laptop Systems  
**Thermal Throttling** - May reduce performance under sustained load

**Scoring Logic:**
- **Best**: VRAM ≥ Model VRAM requirement × 1.6 (60% headroom needed for thermal headroom)
- **Good**: VRAM ≥ Model VRAM requirement × 1.4 (40% headroom)
- **Bad**: VRAM ≥ Model VRAM requirement OR RAM offloading
- **Skipped**: Insufficient resources

### CPU-Only Systems (No NVIDIA GPU)

**Very Slow Inference** - Not recommended except for tiny models

**Scoring Logic:**
- **Best**: Never (CPU inference is always slow)
- **Good**: Never
- **Bad**: Only models requiring ≤8GB VRAM, with RAM ≥ Model RAM × 2
- **Skipped**: All large models (>8GB VRAM requirement)

## Intent Matching

Models are filtered based on selected intent:

- **chat**: All models (general purpose)
- **vision**: Only models with `vision` or `multimodal` tags (LLaVA, Qwen VL, etc.)
- **dev**: Models with `code`, `reasoning`, or `agent` tags
- **creative**: Models with `creative`, `roleplay`, or `storytelling` tags
- **data**: Models with `data`, `reasoning`, or `research` tags

## Fit Reasons

### Apple Silicon Examples:
- ✅ Best: "Excellent fit in unified memory (64GB available, needs 40GB)"
- ✓ Good: "Fits in unified memory with moderate headroom"
- ⚠️ Bad: "Minimal headroom - may be slow under load"

### Windows Desktop Examples:
- ✅ Best: "24GB VRAM » 16GB needed. Desktop = sustained performance"
- ✓ Good: "Fits in 16GB VRAM (needs 14GB)"
- ⚠️ Bad: "Minimal VRAM headroom - may stutter or be unstable"
- ⚠️ Bad (offloading): "Will offload to RAM (VRAM: 8GB < 12GB needed) - slow inference"

### Windows Laptop Examples:
- ✅ Best: "24GB VRAM » 12GB needed. Watch thermals on laptop"
- ⚠️ Bad: "Minimal VRAM headroom - may stutter or be unstable"

### CPU-Only Examples:
- ⚠️ Bad: "CPU-only inference (no NVIDIA GPU) - will be very slow"

## Key Differences from Previous Version

1. **Apple Silicon**: 80% usable (was 75%), 1.6x headroom for best (was 1.5x)
2. **Desktop Bonus**: Desktops get best rating with 1.4x VRAM (laptops need 1.6x)
3. **Laptop Thermal Penalty**: Laptops need more headroom to account for throttling
4. **CPU-Only Filtering**: Large models (>8GB VRAM) are completely skipped
5. **Vision Intent**: Properly filters to only vision/multimodal models
6. **Detailed Fit Reasons**: Now include form factor context and specific recommendations

## Performance Expectations

| System Type | Best Models | Good Models | Bad Models |
|-------------|-------------|-------------|------------|
| **Apple Silicon** | Smooth, fast | Usable, may slow down | Slow, swapping |
| **Windows Desktop** | Max performance | Solid performance | Unstable/slow |
| **Windows Laptop** | Good (watch heat) | Moderate (throttling) | Poor performance |
| **CPU-Only** | N/A | N/A | Very slow |

