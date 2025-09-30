// Background script for handling storage and message passing
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("🎬 Background: Received message:", request);

  if (request.action === "getAutoRedirectSetting") {
    // Get the auto-redirect setting from storage
    chrome.storage.local.get(["auto_redirect_enabled"], (result) => {
      const isEnabled = result.auto_redirect_enabled !== false; // Default to true
      console.log("🎬 Background: Auto-redirect setting:", isEnabled);
      sendResponse(isEnabled);
    });
    return true; // Indicates we will send a response asynchronously
  }

  if (request.action === "setAutoRedirectSetting") {
    // Set the auto-redirect setting in storage
    chrome.storage.local.set({ auto_redirect_enabled: request.enabled }, () => {
      console.log(
        "🎬 Background: Auto-redirect setting updated to:",
        request.enabled
      );
      sendResponse(true);
    });
    return true; // Indicates we will send a response asynchronously
  }

  if (request.action === "checkIfAlreadyRedirected") {
    // Check if video was already redirected using session storage
    chrome.storage.session.get(["last_redirected_video_id"], (result) => {
      const alreadyRedirected =
        result.last_redirected_video_id === request.videoId;
      console.log(
        "🎬 Background: Video already redirected:",
        alreadyRedirected
      );
      sendResponse(alreadyRedirected);
    });
    return true; // Indicates we will send a response asynchronously
  }

  if (request.action === "setRedirectedVideoId") {
    // Store the video ID to prevent re-redirect
    chrome.storage.session.set(
      { last_redirected_video_id: request.videoId },
      () => {
        console.log("🎬 Background: Video ID stored:", request.videoId);
        sendResponse(true);
      }
    );
    return true; // Indicates we will send a response asynchronously
  }
});
