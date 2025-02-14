/* global chrome */

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("Link Library Extension Installed!");
  
  // Initialize storage with default values
  chrome.storage.sync.set({
    links: {
      '2D': [],
      '3D': [],
      'Done Selection': [],
      'Maps': [],
      'Vision': [],
      'Other': []
    }
  }, () => {
    console.log("Storage initialized");
  });
});

// Handle messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);

  if (request.type === 'GET_LINKS') {
    chrome.storage.sync.get('links', (data) => {
      console.log("Sending links:", data.links);
      sendResponse({ links: data.links });
    });
    return true; // Required for async response
  }
  
  if (request.type === 'ADD_LINK') {
    chrome.storage.sync.get('links', (data) => {
      const links = data.links;
      links[request.category].push({
        title: request.title,
        url: request.url
      });
      chrome.storage.sync.set({ links }, () => {
        console.log("Link added:", request);
        sendResponse({ success: true });
      });
    });
    return true;
  }
});
