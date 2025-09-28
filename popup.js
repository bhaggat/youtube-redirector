// Enhanced popup script with better UX
document.addEventListener("DOMContentLoaded", function () {
  const redirectBtn = document.getElementById("redirectBtn");
  const statusDiv = document.getElementById("status");
  const statusText = document.getElementById("statusText");
  const statusIcon = document.querySelector(".status-icon");
  const buttonText = document.getElementById("buttonText");
  const infoDiv = document.getElementById("info");

  // Check current page status on load
  checkCurrentPage();

  function checkCurrentPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        const currentUrl = tabs[0].url;
        const url = new URL(currentUrl);

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
          // On YouTube video page - ready to redirect
          updateStatus(
            "🎬",
            "Ready to redirect to Enhanced YouTube",
            "success"
          );
          redirectBtn.disabled = false;
          buttonText.textContent = "Redirect to Enhanced YouTube";
          infoDiv.style.display = "block";
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
      }
    });
  }

  function updateStatus(icon, text, type) {
    statusIcon.textContent = icon;
    statusText.textContent = text;
    statusDiv.className = `status ${type}`;
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

  redirectBtn.addEventListener("click", function () {
    showLoading();

    // Get current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        const currentUrl = tabs[0].url;
        const url = new URL(currentUrl);

        // Check if we're on a YouTube video page
        if (
          url.hostname === "www.youtube.com" &&
          url.pathname.includes("/watch")
        ) {
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
    });
  });
});
