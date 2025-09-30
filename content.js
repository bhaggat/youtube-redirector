// Content script for automatic YouTube redirection
(function () {
  "use strict";

  // Configuration
  const STORAGE_KEY = "last_redirected_video_id";
  const AUTO_REDIRECT_KEY = "auto_redirect_enabled";
  const REDIRECT_DELAY = 2000; // 2 seconds delay after video starts

  let isRedirecting = false;
  let redirectTimeout = null;

  // Check if auto-redirect is enabled
  function checkAutoRedirectEnabled() {
    return new Promise((resolve) => {
      // Check if chrome.runtime is available
      if (typeof chrome === "undefined" || !chrome.runtime) {
        console.log(
          "🎬 Content script: Chrome runtime not available, defaulting to true"
        );
        resolve(true);
        return;
      }

      // Use message passing to communicate with popup/background
      chrome.runtime.sendMessage(
        { action: "getAutoRedirectSetting" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log(
              "🎬 Content script: Error getting setting, defaulting to true:",
              chrome.runtime.lastError
            );
            resolve(true); // Default to true if error
          } else {
            resolve(response !== false); // Default to true
          }
        }
      );
    });
  }

  // Extract video ID from current URL
  function getVideoIdFromUrl() {
    const url = new URL(window.location.href);
    if (url.hostname === "www.youtube.com" && url.pathname.includes("/watch")) {
      const urlParams = new URLSearchParams(url.search);
      return urlParams.get("v");
    }
    return null;
  }

  // Check if this video was already redirected
  function checkIfAlreadyRedirected(videoId) {
    return new Promise((resolve) => {
      // Check if chrome.runtime is available
      if (typeof chrome === "undefined" || !chrome.runtime) {
        console.log(
          "🎬 Content script: Chrome runtime not available, defaulting to false"
        );
        resolve(false);
        return;
      }

      chrome.runtime.sendMessage(
        { action: "checkIfAlreadyRedirected", videoId: videoId },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log(
              "🎬 Content script: Error checking redirect status, defaulting to false:",
              chrome.runtime.lastError
            );
            resolve(false); // Default to not redirected if error
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  // Perform the redirection
  function performRedirect() {
    if (isRedirecting) return;

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    if (url.hostname === "www.youtube.com" && url.pathname.includes("/watch")) {
      const videoId = getVideoIdFromUrl();
      if (!videoId) return;

      // Store the video ID to prevent re-redirect
      if (typeof chrome !== "undefined" && chrome.runtime) {
        chrome.runtime.sendMessage(
          { action: "setRedirectedVideoId", videoId: videoId },
          (response) => {
            if (chrome.runtime.lastError) {
              console.log(
                "🎬 Content script: Error storing redirect status:",
                chrome.runtime.lastError
              );
            }
          }
        );
      } else {
        console.log(
          "🎬 Content script: Chrome runtime not available, skipping video ID storage"
        );
      }

      // Create the enhanced URL
      const newUrl = `https://www.youtube.com.${url.pathname}${url.search}${url.hash}`;

      isRedirecting = true;

      // Show a brief notification before redirecting
      showRedirectNotification();

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = newUrl;
      }, 1000);
    }
  }

  // Show a notification that redirection is happening
  function showRedirectNotification() {
    // Create notification element
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      animation: slideIn 0.3s ease-out;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>🎬</span>
        <span>Redirecting to Enhanced YouTube...</span>
      </div>
    `;

    // Add animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after redirect
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 2000);
  }

  // Detect when video starts playing
  function detectVideoStart() {
    console.log("🎬 Content script: detectVideoStart called");

    // Wait a bit for video element to be available
    const findVideo = () => {
      const video = document.querySelector("video");
      if (!video) {
        console.log("🎬 Content script: Video element not found, retrying...");
        setTimeout(findVideo, 500);
        return;
      }

      console.log(
        "🎬 Content script: Video element found, setting up listeners"
      );

      // Remove any existing listeners to prevent duplicates
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("pause", handleVideoPause);

      // Add new listeners
      video.addEventListener("play", handleVideoPlay);
      video.addEventListener("pause", handleVideoPause);
    };

    findVideo();
  }

  // Handle video play event
  async function handleVideoPlay() {
    console.log("🎬 Content script: Video play event detected");

    // Check if auto-redirect is enabled
    const autoRedirectEnabled = await checkAutoRedirectEnabled();
    console.log(
      "🎬 Content script: Auto-redirect enabled:",
      autoRedirectEnabled
    );

    if (!autoRedirectEnabled) {
      console.log("🎬 Content script: Auto-redirect disabled, skipping");
      return;
    }

    const videoId = getVideoIdFromUrl();
    console.log("🎬 Content script: Video ID:", videoId);

    if (!videoId) {
      console.log("🎬 Content script: No video ID found, skipping");
      return;
    }

    // Check if this video was already redirected
    const alreadyRedirected = await checkIfAlreadyRedirected(videoId);
    console.log("🎬 Content script: Already redirected:", alreadyRedirected);

    if (alreadyRedirected) {
      console.log("🎬 Content script: Video already redirected, skipping");
      return;
    }

    // Clear any existing timeout
    if (redirectTimeout) {
      clearTimeout(redirectTimeout);
    }

    console.log("🎬 Content script: Setting up redirect timeout");
    // Set up redirect with delay
    redirectTimeout = setTimeout(() => {
      console.log("🎬 Content script: Executing redirect");
      performRedirect();
    }, REDIRECT_DELAY);
  }

  // Handle video pause event
  function handleVideoPause() {
    console.log("🎬 Content script: Video pause event detected");
    if (redirectTimeout) {
      console.log("🎬 Content script: Cancelling redirect timeout");
      clearTimeout(redirectTimeout);
      redirectTimeout = null;
    }
  }

  // Initialize the content script
  function init() {
    console.log("🎬 Content script: Initializing on", window.location.href);

    // Only run on YouTube video pages
    if (
      window.location.hostname === "www.youtube.com" &&
      window.location.pathname.includes("/watch")
    ) {
      console.log(
        "🎬 Content script: On YouTube video page, setting up detection"
      );

      // Wait for the page to load
      if (document.readyState === "loading") {
        console.log(
          "🎬 Content script: Page still loading, waiting for DOMContentLoaded"
        );
        document.addEventListener("DOMContentLoaded", detectVideoStart);
      } else {
        console.log(
          "🎬 Content script: Page already loaded, starting detection"
        );
        detectVideoStart();
      }

      // Also listen for navigation changes (YouTube is a SPA)
      let lastUrl = window.location.href;
      const observer = new MutationObserver(() => {
        if (window.location.href !== lastUrl) {
          console.log(
            "🎬 Content script: URL changed from",
            lastUrl,
            "to",
            window.location.href
          );
          lastUrl = window.location.href;
          if (window.location.pathname.includes("/watch")) {
            console.log(
              "🎬 Content script: New video page detected, setting up detection"
            );
            // Small delay to let the video element load
            setTimeout(detectVideoStart, 1000);
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      console.log("🎬 Content script: Not on YouTube video page, skipping");
    }
  }

  // Start the content script
  init();

  // Fallback: Try to detect video after a longer delay if not found initially
  setTimeout(() => {
    if (
      window.location.hostname === "www.youtube.com" &&
      window.location.pathname.includes("/watch")
    ) {
      console.log("🎬 Content script: Fallback detection attempt");
      detectVideoStart();
    }
  }, 3000);
})();
