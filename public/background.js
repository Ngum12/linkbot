/* global chrome */

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("Chatbot Extension Installed!");
  
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
  });
});

// Handle link storage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ADD_LINK') {
    chrome.storage.sync.get('links', (data) => {
      const links = data.links;
      links[request.category].push({
        title: request.title,
        url: request.url
      });
      chrome.storage.sync.set({ links });
    });
  }
});
