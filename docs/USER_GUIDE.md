# User Guide

## Getting Started

### 1. Launch the Application
Double-click the LLM Eligibility Checker icon to launch the app.

### 2. Enter Your System Information

![Input Screen](images/input_screen.png)

Fill out the system profile form:

- **Primary Usage Intent**: Select what you'll primarily use LLMs for
  - General Chat / Assistant
  - Coding / Development
  - Creative Writing / Roleplay
  - Data Analysis / Local RAG
  - Image Processing / Vision Tasks

- **Form Factor**: Choose your device type
  - Laptop / Macbook
  - Desktop Workstation

- **Manufacturer / Builder**: Enter your device manufacturer (e.g., Apple, Dell, Custom)

- **Model**: Enter your device model (e.g., MacBook Pro M3, Gaming PC)

- **Processor Architecture**: Select your processor type
  - Intel / AMD (x86) - For Windows/Linux systems
  - Apple Silicon (M-Series) - For M1/M2/M3/M4 Macs

Click **CONFIRM & START SCAN** when ready.

### 3. Hardware Scanning

![Scanning Screen](images/scanning_screen.png)

The app will scan your hardware and detect:
- CPU model and specifications
- System RAM (total memory)
- GPU model (if present)
- VRAM (dedicated GPU memory)
- Storage type (SSD/HDD)

This process typically takes 2-5 seconds.

### 4. View Recommendations

![Results Screen](images/results_screen.png)

Models are categorized into three groups:

#### ✅ BEST MODELS
Models that will run smoothly on your hardware with excellent performance. These have significant headroom and won't strain your system.

#### ✓ GOOD MODELS  
Models that will run well on your hardware. Performance will be good, though you may notice some slowdown with very long conversations or complex tasks.

#### ⚠️ BAD MODELS
Models that technically can run but may be very slow, unstable, or cause system strain. Not recommended unless necessary.

### 5. Understanding Fit Reasons

Each model shows a "fit reason" explaining why it's categorized as it is:

**Apple Silicon Examples:**
- ✅ "Excellent fit in unified memory (64GB available, needs 40GB)"
- ⚠️ "Minimal headroom - may be slow under load"

**Windows/Linux Examples:**
- ✅ "24GB VRAM » 16GB needed. Desktop = sustained performance"
- ✓ "Fits in 16GB VRAM (needs 14GB)"
- ⚠️ "Will offload to RAM (VRAM: 8GB < 12GB needed) - slow inference"

## Tips for Best Results

### For Mac Users (Apple Silicon)
- Models use your system's unified memory
- 16GB+ RAM recommended for most models
- 32GB+ RAM for larger models (30B+)
- Close other apps before running large models

### For Windows/Linux Desktop Users
- NVIDIA GPU strongly recommended
- 12GB+ VRAM for mid-size models (13B-34B)
- 24GB+ VRAM for large models (70B+)
- Desktop systems can sustain max performance

### For Windows/Linux Laptop Users
- Watch thermal throttling on sustained loads
- Ensure proper cooling/ventilation
- Consider external cooling pad for best performance
- Close other GPU-intensive apps

### For CPU-Only Systems
- Only tiny models (<8GB requirement) will be recommended
- Inference will be very slow
- Consider upgrading to a system with NVIDIA GPU

## Choosing the Right Model

### By Use Case

**General Chat**
- 7B-13B models for casual conversation
- 30B+ models for complex discussions

**Coding**
- Look for models tagged "code" or "reasoning"
- 13B-34B models recommended
- DeepSeek Coder, CodeLlama families

**Creative Writing**
- 13B-70B models for best creativity
- Look for "creative" or "storytelling" tags

**Data Analysis**
- 13B+ models with "reasoning" tags
- Consider "data" or "research" tagged models

**Image Processing**
- Select "Image Processing / Vision Tasks" intent
- LLaVA 1.6, Qwen VL, Phi-3 Vision recommended
- Requires more VRAM than text-only models

## Troubleshooting

### "No models recommended"
- Your hardware may not meet minimum requirements
- Try selecting a different intent (some require less resources)
- Consider upgrading hardware

### "Models are slow"
- You may be running a "BAD" fit model
- Try models from "BEST" or "GOOD" categories
- Close other resource-intensive applications

### "Impersonation detected" error
- The app detected you entered incorrect hardware info
- Enter your actual system specifications
- The validation prevents inaccurate recommendations

### Scan fails
- Ensure app has system permissions
- Try restarting the app
- Check if antivirus is blocking hardware detection

## Privacy & Security

This application:
- ✅ Runs 100% offline
- ✅ No data sent to external servers
- ✅ No telemetry or tracking
- ✅ Only accesses hardware specifications locally
- ✅ Source code available on GitHub

Your privacy is guaranteed.
