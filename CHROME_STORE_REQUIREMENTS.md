# Chrome Web Store Publishing Requirements

## 🔒 Privacy Practices Tab - Permission Justifications

### 1. activeTab Permission Justification

```
The activeTab permission is required to:
- Detect when the user is on a YouTube video page
- Access the current tab's URL to determine if redirection is needed
- Perform the URL redirection from www.youtube.com to www.youtube.com.
- Only accesses the current active tab when the user explicitly clicks the extension icon
- Does not access tabs in the background or without user interaction
```

### 2. tabs Permission Justification

```
The tabs permission is required to:
- Read the current tab's URL to detect YouTube video pages
- Update the current tab's URL to redirect to enhanced YouTube
- Check if the user is already on the enhanced YouTube domain
- Essential for the core functionality of URL redirection
- Only accesses tabs when user explicitly requests redirection
```

### 3. storage Permission Justification

```
The storage permission is required to:
- Remember user's auto-redirect preference (enabled/disabled)
- Store the toggle state for the "Auto-redirect on video play" setting
- Persist user preferences across browser sessions
- No personal data is stored - only extension settings
```

### 4. Host Permission Justification

```
Host permissions for youtube.com are required to:
- Inject content scripts on YouTube video pages
- Detect when videos start playing for auto-redirect functionality
- Monitor page changes to provide real-time status updates
- Essential for the extension's core redirection functionality
```

### 5. Remote Code Use Justification

```
This extension does not use remote code. All code is:
- Bundled locally within the extension package
- No external scripts or resources are loaded
- No remote code execution or dynamic imports
- All functionality is self-contained and secure
```

## 📋 Single Purpose Description

```
This extension has a single, focused purpose: to redirect users from regular YouTube (www.youtube.com) to enhanced YouTube (www.youtube.com.) for an improved viewing experience. The extension provides one-click redirection with optional automatic redirection when videos start playing. It does not collect data, track users, or perform any other functions beyond this specific redirection purpose.
```

## 📸 Screenshots Required

### Screenshot 1: Main Extension Popup (1280x800)

**Description:** Show the extension popup open on a YouTube video page
**Content:**

- YouTube video page in background
- Extension popup showing "Ready to redirect" status
- Red "Redirect to Enhanced YouTube" button visible
- Auto-redirect toggle setting visible

### Screenshot 2: Different Status States (1280x800)

**Description:** Show various status states of the extension
**Content:**

- Grid showing 4 different states:
  - "Already Enhanced" (green checkmark)
  - "Ready to redirect" (red button)
  - "Navigate to a video first" (warning)
  - "Not on YouTube" (info message)

### Screenshot 3: Before/After Comparison (1280x800)

**Description:** Show the redirection in action
**Content:**

- Split screen showing:
  - Left: Regular YouTube (www.youtube.com)
  - Right: Enhanced YouTube (www.youtube.com.)
- Arrow indicating the redirection
- Extension popup showing the process

### Screenshot 4: Settings Interface (1280x800)

**Description:** Show the extension's settings and features
**Content:**

- Extension popup with auto-redirect toggle
- Settings panel expanded
- Information about how the extension works
- Version information visible

## 🔐 Data Usage Compliance Certification

### Data Collection Statement

```
This extension does not collect, store, or transmit any personal information. All operations are performed locally within the user's browser. The extension only:

1. Reads the current tab's URL to determine if redirection is needed
2. Updates the current tab's URL to redirect to enhanced YouTube
3. Stores user preferences locally (auto-redirect setting)
4. Does not send any data to external servers
5. Does not track user behavior or browsing habits
6. Does not use analytics or tracking services
```

### Privacy Policy Requirements

```
Privacy Policy for YouTube Enhanced Redirector

Last updated: [Current Date]

DATA COLLECTION:
• We do not collect any personal information
• We do not track your browsing habits
• We do not store any data on external servers
• We do not use analytics or tracking
• All operations are performed locally in your browser

PERMISSIONS USED:
• tabs: Required to redirect URLs in your browser
• activeTab: Required to access current tab for redirection
• storage: Required to remember user preferences locally

LOCAL OPERATION:
This extension operates entirely locally in your browser. All redirection happens locally without sending any data to external servers.

CONTACT:
If you have any questions about this privacy policy, please contact us at [your-email@domain.com]

CHANGES:
We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
```

## 📝 Store Listing Information

### Short Description (132 characters max)

```
One-click redirection to enhanced YouTube experience with smart detection and beautiful UI.
```

### Detailed Description

```
🎬 YouTube Enhanced Redirector

Transform your YouTube experience with one click! This beautiful Chrome extension provides instant redirection from regular YouTube to enhanced YouTube experience.

✨ KEY FEATURES:
• One-click redirection with smart page detection
• Beautiful modern UI with gradient design
• Privacy-first approach - no data collection
• Ultra-lightweight (< 60KB)
• Works on all YouTube video pages
• Auto-redirect when videos start playing

🧠 SMART DETECTION:
The extension intelligently detects your current page state:
• ✅ Already Enhanced - Shows when you're on enhanced YouTube
• 🎬 Ready to Redirect - When you're on a YouTube video
• ⚠️ Navigate to Video - When you need to go to a video first
• ❌ Not on YouTube - Clear guidance to get started

🔒 PRIVACY & SECURITY:
• No data collection or tracking
• Minimal permissions (tabs, activeTab, storage)
• Local operation only
• Open source code

⚡ HOW IT WORKS:
1. Visit any YouTube video
2. Click the extension icon
3. See your current status
4. Click "Redirect to Enhanced YouTube"
5. Enjoy the enhanced experience!

Perfect for users who want the enhanced YouTube viewing experience with a modern, intuitive interface.

Made with ❤️ for the YouTube community.
```

### Category

**Productivity**

### Language

**English**

## 🎯 Additional Requirements

### Developer Information

- **Name:** Dhruv Bhagat
- **Email:** dhruv.bhagat98@gmail.com
- **Website:** https://github.com/bhaggat/youtube-redirector

### Support Information

- **Support URL:** https://github.com/bhaggat/youtube-redirector/issues
- **Privacy Policy URL:** https://bhaggat.github.io/youtube-redirector

### Testing Checklist

- [ ] Extension loads without errors
- [ ] All permissions work as expected
- [ ] Redirection functionality works correctly
- [ ] Auto-redirect toggle works
- [ ] No console errors
- [ ] Works on different YouTube pages
- [ ] Icons display correctly at all sizes

## 📦 Final Submission Checklist

- [ ] Extension packaged and zipped
- [ ] All required icons included (16x16, 48x48, 128x128)
- [ ] Screenshots created (1280x800 or 640x400)
- [ ] Privacy policy created and hosted
- [ ] Store listing description written
- [ ] Category selected (Productivity)
- [ ] Language set (English)
- [ ] Developer information filled
- [ ] All permission justifications provided
- [ ] Single purpose description provided
- [ ] Data usage compliance certified
- [ ] Extension tested thoroughly
- [ ] No console errors
- [ ] All requirements completed
