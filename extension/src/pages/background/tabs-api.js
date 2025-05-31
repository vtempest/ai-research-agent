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
  