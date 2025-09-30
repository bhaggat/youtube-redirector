# YouTube Enhanced Redirector

A beautiful Chrome extension that provides one-click redirection from regular YouTube to enhanced YouTube experience. Perfect for users who want the enhanced viewing experience with a modern, intuitive interface.

## ✨ Features

- **🤖 Auto-Redirect**: Automatically redirects when you start playing a video
- **🎯 Manual Override**: Toggle between automatic and manual redirection modes
- **🧠 Smart Detection**: Automatically detects your current page state
- **🎨 Modern UI**: Beautiful gradient design with smooth animations
- **📱 Responsive**: Works perfectly on all screen sizes
- **🔒 Privacy-First**: No data collection, no tracking, minimal permissions
- **⚡ Fast & Lightweight**: Minimal resource usage, instant response

## 🚀 How It Works

### Automatic Mode (Default)

1. **Visit YouTube**: Go to any YouTube video page
2. **Start Playing**: Simply start playing any video
3. **Auto-Redirect**: The extension automatically redirects you to enhanced YouTube
4. **Enjoy**: Experience the enhanced YouTube interface

### Manual Mode

1. **Visit YouTube**: Go to any YouTube video page
2. **Click Extension**: Click the extension icon in your browser toolbar
3. **See Status**: The popup shows your current page status
4. **Redirect**: Click the "Redirect to Enhanced YouTube" button
5. **Enjoy**: Experience the enhanced YouTube interface

## 📦 Installation

### From Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon.

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will appear in your toolbar

## 🎯 Usage

### Smart Status Detection

The extension intelligently detects your current page:

- **✅ Already Enhanced**: Shows when you're already on enhanced YouTube
- **🤖 Auto-Redirect Enabled**: When auto-redirect is on and you're on a video page
- **🎬 Ready to Redirect**: When you're on a YouTube video page (manual mode)
- **⚠️ Navigate to Video**: When you're on YouTube but not a video page
- **❌ Not on YouTube**: When you need to go to YouTube first

### Settings & Controls

- **Toggle Auto-Redirect**: Use the toggle switch to enable/disable automatic redirection
- **Manual Override**: Even with auto-redirect enabled, you can still manually redirect
- **Smart Prevention**: Prevents redirecting the same video multiple times

## 🔧 Technical Details

- **Manifest Version**: 3 (Latest Chrome standard)
- **Permissions**: `tabs`, `storage`, `activeTab` (minimal permissions)
- **Content Scripts**: Automatic redirection detection on YouTube video pages
- **Background Scripts**: None (event-driven architecture)
- **File Size**: < 60KB (ultra-lightweight)

## 🔒 Privacy & Security

This extension is designed with privacy in mind:

- ✅ **No Data Collection**: Doesn't collect any personal information
- ✅ **No Tracking**: Doesn't track your browsing habits
- ✅ **No External Requests**: Doesn't send data to external servers
- ✅ **Local Operation**: Only redirects URLs locally in your browser
- ✅ **Minimal Permissions**: Only requests `tabs` permission
- ✅ **Open Source**: Full source code available for review

## 🛠️ Development

### Project Structure

```
├── manifest.json          # Extension configuration
├── popup.html            # Modern popup interface with settings
├── popup.js              # Enhanced popup functionality with automation
├── content.js            # Content script for automatic redirection
├── icon16.png            # Extension icons (16x16)
├── icon48.png            # Extension icons (48x48)
├── icon128.png           # Extension icons (128x128)
├── icon.svg              # Vector icon source
└── README.md            # Documentation
```

### Building

No build process required - the extension runs directly from source files.

### Testing

1. Load the extension in developer mode
2. Visit YouTube and test the redirection
3. Test different page states (video, homepage, etc.)
4. Check browser console for any errors

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test on multiple YouTube pages
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Having issues? We're here to help!

1. **Check Issues**: Look at existing [Issues](https://github.com/bhaggat/youtube-redirector/issues)
2. **Create Issue**: Create a new issue with:
   - Browser version
   - Extension version
   - Steps to reproduce
   - Screenshots if applicable
3. **Contact**: Reach out to [@bhaggat](https://github.com/bhaggat)

## 📈 Roadmap

### Version 1.1.0 (Planned)

- [ ] Keyboard shortcuts
- [ ] Bulk redirect options
- [ ] Custom redirect domains
- [ ] Analytics dashboard

### Version 1.2.0 (Future)

- [ ] Firefox support
- [ ] Safari support
- [ ] Advanced settings panel
- [ ] Theme customization

## 📊 Changelog

### Version 1.1.0 (Current)

- 🤖 **NEW**: Automatic redirection when video starts playing
- 🎛️ **NEW**: Toggle between automatic and manual modes
- 🎯 One-click redirection with button interface
- 🧠 Smart page state detection
- 🎨 Modern gradient UI design with settings panel
- 🔒 Privacy-first approach
- ⚡ Ultra-lightweight (< 60KB)

### Version 1.0.0 (Previous)

- ✨ Initial release
- 🎯 One-click redirection with button interface
- 🧠 Smart page state detection
- 🎨 Modern gradient UI design
- 🔒 Privacy-first approach
- ⚡ Ultra-lightweight (< 50KB)

## 🌟 Star This Project

If you find this extension useful, please give it a star on GitHub! It helps others discover the project.

## 📱 Screenshots

_Screenshots will be added once the extension is published_

---

**Made with ❤️ by [Dhruv Bhagat](https://github.com/bhaggat)**
