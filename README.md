# YouTube URL Redirector Chrome Extension

A Chrome extension that automatically redirects YouTube URLs to ensure proper navigation and enhanced functionality.

## Features

- Automatically redirects from `www.youtube.com` to `www.youtube.com.` with enhanced functionality
- Clean and simple popup interface
- Professional icon design
- Lightweight and fast

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select this folder
5. The extension will be installed and active

## Files

- `manifest.json` - Extension configuration
- `background.js` - Background script that handles URL redirection
- `popup.html` - Extension popup interface
- `icon.svg` - Source icon file
- `create_icons.html` - Tool to generate PNG icons

## Icon Generation

To create the required PNG icon files:

1. Open `create_icons.html` in your browser
2. Right-click on each canvas and "Save image as":
   - Save the 16x16 canvas as `icon16.png`
   - Save the 48x48 canvas as `icon48.png`
   - Save the 128x128 canvas as `icon128.png`

## Customization

You can modify the redirect behavior by editing `background.js`:

```javascript
// Change these variables to redirect between different URLs
const oldUrlHost = "www.youtube.com";
const newUrlHost = "www.youtube.com";
```

## Permissions

This extension requires:

- `webNavigation` - To detect navigation events
- `tabs` - To update tab URLs

## Version

1.0 - Initial release

## Author

Your Name - Update this in manifest.json
# youtube-redirector
