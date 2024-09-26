// Wrap your code inside an event listener for the runtime.onInstalled event
chrome.runtime.onInstalled.addListener(function() {
  // Check if the contextMenus API is available
  if (chrome.contextMenus) {
    // Add an onClicked event listener inside the create method
    chrome.contextMenus.create({
      title: 'Search Letterboxd',
      contexts: ['selection'],
      id: 'searchLetterboxdContextMenu',
      onclick: function(info, tab) {
        if (info.menuItemId === 'searchLetterboxdContextMenu') {
          chrome.tabs.create({ url: 'https://letterboxd.com/search/films/' + encodeURIComponent(info.selectionText) });
        }
      }
    });

    chrome.storage.sync.set({ searchTiming: 'Now' }, function() {
      console.log('Search timing is set to Now.');
    });
  } else {
    console.error("chrome.contextMenus is not available.");
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getSelectedText') {
    sendResponse({ selectedText: window.getSelection().toString() });
  }
});
