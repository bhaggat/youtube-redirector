#!/bin/bash

# YouTube Enhanced Redirector - Package Script
# This script creates a zip file ready for Chrome Web Store upload

echo "🎬 YouTube Enhanced Redirector - Packaging Extension"
echo "=================================================="

# Create package directory
PACKAGE_DIR="youtube-enhanced-redirector-v1.0.0"
ZIP_FILE="youtube-enhanced-redirector-v1.0.0.zip"

# Remove existing package if it exists
if [ -d "$PACKAGE_DIR" ]; then
    echo "🗑️  Removing existing package directory..."
    rm -rf "$PACKAGE_DIR"
fi

if [ -f "$ZIP_FILE" ]; then
    echo "🗑️  Removing existing zip file..."
    rm "$ZIP_FILE"
fi

# Create package directory
echo "📁 Creating package directory..."
mkdir "$PACKAGE_DIR"

# Copy required files
echo "📋 Copying extension files..."
cp manifest.json "$PACKAGE_DIR/"
cp popup.html "$PACKAGE_DIR/"
cp popup.js "$PACKAGE_DIR/"
cp icon16.png "$PACKAGE_DIR/"
cp icon48.png "$PACKAGE_DIR/"
cp icon128.png "$PACKAGE_DIR/"

# Create zip file
echo "📦 Creating zip package..."
zip -r "$ZIP_FILE" "$PACKAGE_DIR"

# Clean up
echo "🧹 Cleaning up..."
rm -rf "$PACKAGE_DIR"

echo ""
echo "✅ Package created successfully!"
echo "📦 File: $ZIP_FILE"
echo "📏 Size: $(du -h "$ZIP_FILE" | cut -f1)"
echo ""
echo "🚀 Ready for Chrome Web Store upload!"
echo ""
echo "Next steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole/"
echo "2. Click 'New Item'"
echo "3. Upload the zip file: $ZIP_FILE"
echo "4. Fill in the store listing details"
echo "5. Submit for review"
echo ""
echo "📋 Required store listing information:"
echo "- Name: YouTube Enhanced Redirector"
echo "- Summary: One-click redirection to enhanced YouTube experience"
echo "- Description: See README.md for full description"
echo "- Category: Productivity"
echo "- Language: English"
echo "- Privacy Policy: Required (create one)"
echo "- Screenshots: Required (create 1280x800 or 640x400)"
echo ""

