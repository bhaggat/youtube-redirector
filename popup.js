// Enhanced popup script with better UX
document.addEventListener("DOMContentLoaded", function () {
  // Constants - declare at the top
  const STORAGE_KEY = "last_redirected_video_id";
  const AUTO_REDIRECT_KEY = "auto_redirect_enabled";

  const redirectBtn = document.getElementById("redirectBtn");
  const statusDiv = document.getElementById("status");
  const statusText = document.getElementById("statusText");
  const statusIcon = document.querySelector(".status-icon");
  const buttonText = document.getElementById("buttonText");
  const infoDiv = document.getElementById("info");
  const versionDiv = document.getElementById("version");
  const autoRedirectToggle = document.getElementById("autoRedirectToggle");

  // Set version number from manifest
  if (versionDiv) {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      try {
        const manifest = chrome.runtime.getManifest();
        versionDiv.textContent = `v${manifest.version}`;
      } catch (error) {
        console.log("🎬 Popup: Error getting manifest, using default version");
        versionDiv.textContent = `v1.0.0`;
      }
    } else {
      versionDiv.textContent = `v1.0.0`;
    }
  }

  // Check current page status on load
  checkCurrentPage();

  // Load and setup auto-redirect toggle
  loadAutoRedirectSetting();

  // Extract video ID from YouTube URL
  function getVideoIdFromUrl(url) {
    if (url.hostname === "www.youtube.com" && url.pathname.includes("/watch")) {
      const urlParams = new URLSearchParams(url.search);
      return urlParams.get("v");
    }
    return null;
  }

  function checkCurrentPage() {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          const currentUrl = tabs[0].url;
          const url = new URL(currentUrl);

          // Extract video ID from current URL
          const currentVideoId = getVideoIdFromUrl(url);

          // Check if this video was already redirected
          if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.session.get([STORAGE_KEY], function (result) {
              const lastRedirectedVideoId = result[STORAGE_KEY];

              if (url.hostname === "www.youtube.com.") {
                // Already on enhanced YouTube
                updateStatus("✅", "Already on Enhanced YouTube", "success");
                redirectBtn.disabled = true;
                buttonText.textContent = "Already Enhanced";
                infoDiv.style.display = "block";
              } else if (
                url.hostname === "www.youtube.com" &&
                url.pathname.includes("/watch")
              ) {
                // Check if this video was already redirected
                if (
                  currentVideoId &&
                  lastRedirectedVideoId === currentVideoId
                ) {
                  updateStatus(
                    "🔄",
                    "This video was already redirected. Enhanced version may not be available.",
                    "warning"
                  );
                  redirectBtn.disabled = true;
                  buttonText.textContent = "Already Redirected";
                  infoDiv.style.display = "block";
                } else {
                  // On YouTube video page - ready to redirect
                  // Check if auto-redirect is enabled
                  if (typeof chrome !== "undefined" && chrome.runtime) {
                    chrome.runtime.sendMessage(
                      { action: "getAutoRedirectSetting" },
                      function (autoRedirectEnabled) {
                        if (chrome.runtime.lastError) {
                          console.log(
                            "🎬 Popup: Error getting setting, defaulting to true:",
                            chrome.runtime.lastError
                          );
                          autoRedirectEnabled = true;
                        }

                        if (autoRedirectEnabled) {
                          updateStatus(
                            "🤖",
                            "Auto-redirect enabled - will redirect when you play the video",
                            "success"
                          );
                          redirectBtn.disabled = false;
                          buttonText.textContent =
                            "Manual Redirect (Auto-enabled)";
                        } else {
                          updateStatus(
                            "🎬",
                            "Ready to redirect to Enhanced YouTube",
                            "success"
                          );
                          redirectBtn.disabled = false;
                          buttonText.textContent =
                            "Redirect to Enhanced YouTube";
                        }
                        infoDiv.style.display = "block";
                      }
                    );
                  } else {
                    console.log(
                      "🎬 Popup: Chrome runtime not available, defaulting to manual mode"
                    );
                    updateStatus(
                      "🎬",
                      "Ready to redirect to Enhanced YouTube",
                      "success"
                    );
                    redirectBtn.disabled = false;
                    buttonText.textContent = "Redirect to Enhanced YouTube";
                    infoDiv.style.display = "block";
                  }
                }
              } else if (url.hostname === "www.youtube.com") {
                // On YouTube but not a video page
                updateStatus("⚠️", "Navigate to a video first", "error");
                redirectBtn.disabled = true;
                buttonText.textContent = "Go to a Video First";
                infoDiv.style.display = "block";
              } else {
                // Not on YouTube
                updateStatus("❌", "Not on YouTube", "error");
                redirectBtn.disabled = true;
                buttonText.textContent = "Go to YouTube First";
                infoDiv.style.display = "block";
              }
            });
          } else {
            // Fallback when storage is not available
            if (
              url.hostname === "www.youtube.com" &&
              url.pathname.includes("/watch")
            ) {
              updateStatus(
                "🎬",
                "Ready to redirect to Enhanced YouTube",
                "success"
              );
              redirectBtn.disabled = false;
              buttonText.textContent = "Redirect to Enhanced YouTube";
              infoDiv.style.display = "block";
            } else if (url.hostname === "www.youtube.com") {
              updateStatus("⚠️", "Navigate to a video first", "error");
              redirectBtn.disabled = true;
              buttonText.textContent = "Go to a Video First";
              infoDiv.style.display = "block";
            } else {
              updateStatus("❌", "Not on YouTube", "error");
              redirectBtn.disabled = true;
              buttonText.textContent = "Go to YouTube First";
              infoDiv.style.display = "block";
            }
          }
        }
      });
    } else {
      console.log("🎬 Popup: Chrome tabs API not available");
      updateStatus("❌", "Extension not available", "error");
      redirectBtn.disabled = true;
      buttonText.textContent = "Extension Error";
      infoDiv.style.display = "block";
    }
  }

  function updateStatus(icon, text, type) {
    statusIcon.textContent = icon;
    statusText.textContent = text;
    statusDiv.className = `status ${type}`;
  }

  // Load auto-redirect setting from storage
  function loadAutoRedirectSetting() {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage(
        { action: "getAutoRedirectSetting" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log(
              "🎬 Popup: Error getting setting, defaulting to true:",
              chrome.runtime.lastError
            );
            if (autoRedirectToggle) {
              autoRedirectToggle.checked = true;
            }
          } else {
            const isEnabled = response !== false; // Default to true
            if (autoRedirectToggle) {
              autoRedirectToggle.checked = isEnabled;
            }
          }
        }
      );
    } else {
      console.log(
        "🎬 Popup: Chrome runtime not available, defaulting to enabled"
      );
      if (autoRedirectToggle) {
        autoRedirectToggle.checked = true;
      }
    }
  }

  // Save auto-redirect setting to storage
  function saveAutoRedirectSetting(enabled) {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage(
        { action: "setAutoRedirectSetting", enabled: enabled },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log(
              "🎬 Popup: Error saving setting:",
              chrome.runtime.lastError
            );
          } else {
            console.log("🎬 Popup: Setting saved successfully");
          }
        }
      );
    } else {
      console.log(
        "🎬 Popup: Chrome runtime not available, cannot save setting"
      );
    }
  }

  function showLoading() {
    updateStatus("⏳", "Redirecting...", "loading");
    redirectBtn.disabled = true;
    buttonText.textContent = "Redirecting...";
    statusDiv.classList.add("pulse");
  }

  function showSuccess() {
    updateStatus("✅", "Redirected successfully!", "success");
    buttonText.textContent = "Redirected!";
    statusDiv.classList.remove("pulse");
  }

  function showError(message) {
    updateStatus("❌", message, "error");
    redirectBtn.disabled = false;
    buttonText.textContent = "Try Again";
    statusDiv.classList.remove("pulse");

    // Reset after 3 seconds
    setTimeout(() => {
      checkCurrentPage();
    }, 3000);
  }

  console.log("redirectBtn", redirectBtn);
  console.log("redirectBtn disabled:", redirectBtn.disabled);

  if (redirectBtn) {
    redirectBtn.addEventListener("click", function () {
      console.log("redirectBtn clicked");
      showLoading();

      // Get current active tab
      if (typeof chrome !== "undefined" && chrome.tabs) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (tabs[0]) {
              const currentUrl = tabs[0].url;
              const url = new URL(currentUrl);

              // Check if we're on a YouTube video page
              if (
                url.hostname === "www.youtube.com" &&
                url.pathname.includes("/watch")
              ) {
                // Extract and store the video ID
                const videoId = getVideoIdFromUrl(url);
                console.log("videoId", { videoId, url });
                if (
                  videoId &&
                  typeof chrome !== "undefined" &&
                  chrome.storage
                ) {
                  chrome.storage.session.set({ [STORAGE_KEY]: videoId });
                }

                // Redirect to enhanced YouTube
                const newUrl = `https://www.youtube.com.${url.pathname}${url.search}${url.hash}`;

                chrome.tabs.update(tabs[0].id, { url: newUrl }, function () {
                  if (chrome.runtime.lastError) {
                    showError("Redirect failed. Please try again.");
                  } else {
                    showSuccess();
                    // Close popup after a short delay
                    setTimeout(() => {
                      window.close();
                    }, 1000);
                  }
                });
              } else {
                showError("Please navigate to a YouTube video first.");
              }
            } else {
              showError("Could not access current tab.");
            }
          }
        );
      } else {
        showError("Extension not available.");
      }
    });
  } else {
    console.error("redirectBtn element not found!");
  }

  // Handle auto-redirect toggle
  if (autoRedirectToggle) {
    autoRedirectToggle.addEventListener("change", function () {
      const isEnabled = this.checked;
      saveAutoRedirectSetting(isEnabled);

      // Update status to show current setting
      if (isEnabled) {
        updateStatus("🤖", "Auto-redirect enabled", "success");
      } else {
        updateStatus("👤", "Manual mode only", "info");
      }

      // Reset status after 2 seconds
      setTimeout(() => {
        checkCurrentPage();
      }, 2000);
    });
  }
});
