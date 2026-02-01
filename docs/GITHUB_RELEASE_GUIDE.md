# GitHub Release Instructions for Insight AI v1.0.0

## Quick Steps

1. **Go to GitHub Releases Page**
   ```
   https://github.com/debarun1234/llm-model-eligibility-checker/releases/new
   ```

2. **Fill in Release Details**
   - **Tag**: Select `v1.0.0` (already exists)
   - **Release Title**: `Insight AI v1.0.0`
   - **Description**: Copy from below

3. **Upload Installer**
   - Click "Attach binaries" or drag-and-drop
   - Upload: `release/Insight AI Setup 1.0.0.exe` (301 MB)

4. **Publish Release**

---

## Release Description (Copy-Paste This)

```markdown
# Insight AI v1.0.0 - First Official Release 🎉

**Discover Your Perfect AI Model Match**

Insight AI is a powerful desktop application that analyzes your hardware to recommend the perfect Local LLM models for your system.

## 📥 Download

**Windows Installer**
- File: `Insight AI Setup 1.0.0.exe`
- Size: ~301 MB
- Requirements: Windows 10 or later

> **Note**: Windows may show a SmartScreen warning (unsigned app). Click "More info" → "Run anyway".

---

## ✨ Features

### 🧠 Intelligent Hardware Analysis
- Automatic detection of CPU, RAM, GPU, VRAM (Apple Silicon support included)
- Smart recommendations with priority-based scoring
- 3-tier categorization: BEST, GOOD, BAD

### 🎨 Beautiful Design
- Modern glassmorphism UI with cyan-purple gradients
- Rainbow circuit pattern background
- Optimized text contrast for readability

### 🔒 Privacy First
- 100% offline operation
- No cloud dependencies
- Zero data collection or telemetry

### 💻 Professional Distribution
- NSIS installer with custom directory selection
- Automatic desktop shortcut creation
- Start Menu integration
- Professional uninstaller

---

## 🆕 What's New in v1.0.0

### Rebranding
- **New Name**: "Insight AI" with professional brain-circuit logo
- **Tagline**: "Discover Your Perfect AI Model Match"
- First official v1.0.0 release!

### UI Enhancements
- Rainbow hexagon circuit background patterns
- Improved text contrast and readability
- Brighter colors (#d1d5db for secondary text)
- Clean, static professional aesthetic

### Technical
- Electron 40.1.0
- React 19.2.0
- Professional NSIS installer
- ASAR packaging
- Comprehensive documentation

---

## 📚 Documentation

- [BUILD_GUIDE.md](docs/BUILD_GUIDE.md)
- [USER_GUIDE.md](docs/USER_GUIDE.md)  
- [CHANGELOG.md](CHANGELOG.md)

---

## 🛠️ Technical Details

- **Electron**: 40.1.0
- **React**: 19.2.0
- **Architecture**: x64
- **Size**: ~301 MB (includes Chromium runtime)

---

## 🐛 Known Issues

- macOS installer not available (requires macOS build environment)
- Unsigned application (Windows SmartScreen warning expected)
- First launch may take 10-15 seconds

---

## 🙏 Credits

**Developed by**: Debarun Ghosh  
AI/ML & Site Reliability Engineer at ANZ  
Postgrad in Applied GenAI from Purdue University

Built with ❤️ for the Local LLM community.

---

## 📞 Support

- [Report a Bug](https://github.com/debarun1234/llm-model-eligibility-checker/issues)
- [GitHub](https://github.com/debarun1234)
- [LinkedIn](https://linkedin.com/in/debarun-ghosh)

---

**License**: MIT License

**Thank you for using Insight AI!** 🚀
```

---

## Step-by-Step with Screenshots

1. **Navigate to Releases**
   - Go to your repository
   - Click "Releases" in the right sidebar
   - Click "Create a new release" or "Draft a new release"

2. **Select Tag**
   - In the "Choose a tag" dropdown, select `v1.0.0`
   - It should show "Existing tag: v1.0.0"

3. **Add Title**
   - Release title: `Insight AI v1.0.0`

4. **Add Description**
   - Paste the markdown content from above

5. **Upload Installer**
   - Scroll to "Attach binaries by dropping them here or selecting them"
   - Click to browse or drag `release/Insight AI Setup 1.0.0.exe`
   - Wait for upload to complete (~301 MB)

6. **Publish**
   - Check "Set as the latest release" 
   - Click "Publish release"

---

## What Happens After Publishing

- Release will be visible at: `https://github.com/debarun1234/llm-model-eligibility-checker/releases`
- Tag `v1.0.0` will be linked to the release
- Users can download `Insight AI Setup 1.0.0.exe` directly
- Release will show up in repository sidebar

---

## Alternative: GitHub CLI (Optional)

If you have GitHub CLI installed:

```bash
# Create release with installer
gh release create v1.0.0 \
  "release/Insight AI Setup 1.0.0.exe" \
  --title "Insight AI v1.0.0" \
  --notes-file docs/RELEASE_NOTES.md
```

---

## Verification

After publishing, you should see:
- ✅ Release at: `https://github.com/debarun1234/llm-model-eligibility-checker/releases/tag/v1.0.0`
- ✅ Download link for Windows installer
- ✅ Full release notes visible
- ✅ Tag badge showing "v1.0.0"

The installer will be available for direct download!
