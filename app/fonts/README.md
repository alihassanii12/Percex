# Fonts Directory

This directory should contain the following font files:

## Required Fonts

1. **Cabinet Grotesk Extrabold**
   - File: `CabinetGrotesk-Extrabold.woff2`
   - Source: [Fontshare](https://www.fontshare.com/fonts/cabinet-grotesk)
   - Weight: 800
   - Usage: Headings

2. **Satoshi Regular**
   - File: `Satoshi-Regular.woff2`
   - Source: [Fontshare](https://www.fontshare.com/fonts/satoshi)
   - Weight: 400
   - Usage: Body text

## Installation Instructions

1. Download the fonts from Fontshare (free for commercial use)
2. Convert to WOFF2 format if needed
3. Place the files in this directory
4. The page.tsx file is already configured to load these fonts

## Fallback Fonts

If the custom fonts are not available, the page will use system fonts:
- system-ui
- -apple-system
- BlinkMacSystemFont
- Segoe UI
- sans-serif
