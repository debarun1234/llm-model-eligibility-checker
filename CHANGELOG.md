# Changelog

All notable changes to Insight AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-01

### Added
- **Complete Rebranding**: Application renamed to "Insight AI"
  - New tagline: "Discover Your Perfect AI Model Match"
  - Updated all UI components and metadata
  - Professional app icon with circuit-brain design

- **Distribution Ready**
  - Windows NSIS installer (`.exe`)
  - Comprehensive build documentation
  - Professional packaging with desktop shortcuts

- **Enhanced UI/UX**
  - Beautiful glassmorphism design with rainbow circuit patterns
  - Cyan-purple gradient neon accents throughout
  - Balanced foreground-background color contrast for readability
  - Improved text visibility with brighter secondary colors

- **Background Patterns**
  - Rainbow hexagon circuit lines (cyan, purple, pink)
  - Subtle dot pattern overlay
  - Static, professional aesthetic

### Changed
- App name: "LLM Eligibility Checker" → "Insight AI"
- Package name: `llm-model-eligibility-checker` → `insight-ai`
- Version: 0.0.0 → 1.0.0
- Text colors brightened for better readability (secondary: #a1a1aa → #d1d5db)
- Background pattern opacity balanced for optimal visual hierarchy

### Removed
- Mouse flashlight/glow effect (simplified for clean static background)
- Interactive particle systems

### Technical
- Electron Builder configured for Windows/macOS distribution
- Build scripts: `build:win`, `build:mac`, `build:all`
- Professional NSIS installer with:
  - Custom installation directory selection
  - Desktop shortcut creation
  - Start Menu integration
  - Uninstaller support
- ASAR packaging enabled for security and performance
- Output directory: `release/`

### Documentation
- Created BUILD_GUIDE.md with comprehensive build instructions
- Updated About screen with new branding
- Professional walkthrough documentation

---

## Previous Development

### Pre-1.0.0 (Initial Development)
- Core hardware detection (CPU, RAM, GPU, VRAM)
- LLM recommendation engine with priority scoring
- 3-tier categorization (BEST, GOOD, BAD)
- Offline-first architecture with zero telemetry
- Glassmorphism UI design
- Electron desktop application framework
- React + Framer Motion frontend
- systeminformation backend integration

[1.0.0]: https://github.com/debarun1234/llm-model-eligibility-checker/releases/tag/v1.0.0
