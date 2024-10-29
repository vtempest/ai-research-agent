import * as tabs from "./tabs-api";
import * as context from "./context-menu";
import * as cors from "./allow-cors";

/** LISTENERS */

// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#external-webpage

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  var { type, url } = request;

  if (type === "openTab") 
    chrome.tabs.create({
      url,
      active: request.bg ? false : true,
      selected: request.bg ? false : true,
    });
    
  if (type === "updateTabOrder") {
    updateTabOrder(request.newOrder);
  }

  if (type === "openDebateApp") {  
    chrome.runtime.openOptionsPage();

  }

  if (type === "requestFullScreen") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let currentTab = tabs[0];
      if (currentTab) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: toggleFullScreen
        }, () => {
          // Open the sidebar after toggling full screen
          chrome.sidePanel.open({ windowId: currentTab.windowId }).then(() => {
            // Ensure the sidebar is visible
            chrome.sidePanel.setOptions({
              enabled: true,
              path: 'sidepanel.html',
              mobile: true,
              active: true
            });
          });
        });
      }
    });
  }

  return true;
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      // Notify that full screen is activated
      chrome.runtime.sendMessage({ type: "fullScreenActivated" });
    }).catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        // Notify that full screen is deactivated
        chrome.runtime.sendMessage({ type: "fullScreenDeactivated" });
      });
    }
  }
}

/** SIDEPANEL BEHAVIOR */

// allow side panel to open on action click
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

  