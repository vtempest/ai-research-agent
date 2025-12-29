import * as tabs from "./tabs-api";
import * as context from "./context-menu";
import * as cors from "./allow-cors";
/** LISTENERS */
import {extractContentAndCite} from '/mnt/data/Projects/ai-research-agent/packages/ai-research-agent/src/extractor/html-to-content/html-to-content.js'

// https://developer.chrome.com/docs/extensions/develop/concepts/messaging#external-webpage

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var { type, url } = request;

  // Open tab in user's browser just to get HTML, then close
  if (type === "extractURL") 
    chrome.tabs.create(
      {
        url: url,
        selected: false,
        active: false,
      },
      (tab) => {
        const tabId = tab.id;
        const onTabUpdated = (updatedTabId, changeInfo) => {
          if (updatedTabId === tabId && changeInfo.status === "complete") {
            chrome.tabs.onUpdated.removeListener(onTabUpdated);
            chrome.scripting
              .executeScript({
                target: { tabId: tabId },
                func:  () =>  (document.documentElement.outerHTML)
              })
              .then((htmlContent) => {

                // var html = htmlContent?.[0]?.result;

                // console.log(html)
                
                // console.log(htmlContent?.[0]?.result.length)
                sendResponse({ success: true, html: htmlContent?.[0]?.result });
                chrome.tabs.remove(tabId);
              })
              .catch((error) => {
                sendResponse({ success: false, error: error.message });
                chrome.tabs.remove(tabId);
              });
          }
        };

        chrome.tabs.onUpdated.addListener(onTabUpdated);
      }
    );
  

  // open Tab in background
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
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentTab = tabs[0];
      if (currentTab) {
        chrome.scripting.executeScript(
          {
            target: { tabId: currentTab.id },
            function: toggleFullScreen,
          },
          () => {
            // Open the sidebar after toggling full screen
            chrome.sidePanel
              .open({ windowId: currentTab.windowId })
              .then(() => {
                // Ensure the sidebar is visible
                chrome.sidePanel.setOptions({
                  enabled: true,
                  path: "sidepanel.html",
                  mobile: true,
                  active: true,
                });
              });
          }
        );
      }
    });
  }

  return true;
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement
      .requestFullscreen()
      .then(() => {
        // Notify that full screen is activated
        chrome.runtime.sendMessage({ type: "fullScreenActivated" });
      })
      .catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
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

/** TABS API */

// Propagate tab updates to the side panel
function notifyTabUpdate(updateType, tabId, changeInfo) {
  chrome.runtime.sendMessage({
    type: "updateTabLists",
    updateType: updateType,
    tabId: tabId,
    changeInfo: changeInfo,
  });
}
// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" || changeInfo.title) {
    notifyTabUpdate("updated", tabId, { url: tab.url, title: tab.title });
  }
});
// Listen for tab creation
chrome.tabs.onCreated.addListener((tab) => {
  notifyTabUpdate("created", tab.id, { url: tab.url, title: tab.title });
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  notifyTabUpdate("removed", tabId, {});
});

// Listen for tab switches
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    notifyTabUpdate("activated", tab.id, { url: tab.url, title: tab.title });
  });
});

// Set the side panel options when a tab is updated
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  // console.log("Tab updated (for side panel):", tabId, info, tab.url);

  await chrome.sidePanel.setOptions({
    tabId,
    path: "src/pages/sidepanel/index.html",
    enabled: true,
  });

  notifyTabUpdate("updated", tabId, { url: tab.url, title: tab.title });
});

// Update the tab order in the background script with the new order
function updateTabOrder(newOrder) {
  console.log("Updating tab order:", newOrder);

  chrome.windows.getCurrent({ populate: true }, function (window) {
    const currentTabs = window.tabs;
    const tabIndexMap = new Map(
      currentTabs.map((tab, index) => [tab.id, index])
    );

    newOrder.forEach((tabId, newIndex) => {
      const currentIndex = tabIndexMap.get(parseInt(tabId));
      if (currentIndex !== undefined && currentIndex !== newIndex) {
        chrome.tabs.move(parseInt(tabId), { index: newIndex }, (tab) => {
          if (chrome.runtime.lastError) {
            console.error(
              `Error moving tab ${tabId}: ${chrome.runtime.lastError.message}`
            );
          } else {
            console.log(`Moved tab ${tabId} to index ${newIndex}`);
          }
        });
      }
    });

    // Use setTimeout to send the completion message after a short delay
    setTimeout(() => {
      console.log("Tab reordering complete");
      chrome.runtime.sendMessage({
        type: "tabReorderComplete",
      });
    }, 500); // 500ms delay
  });
}
