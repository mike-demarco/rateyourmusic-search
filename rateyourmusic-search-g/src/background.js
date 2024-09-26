// Define a variable to track whether the context menu item has been created
let contextMenuItemCreated = false;

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({searchTiming: 'Now'}, function() {
    console.log('Search timing is set to Now.');
  });

  // Check if the context menu item has already been created
  if (!contextMenuItemCreated) {
    // If it hasn't been created, create it
    chrome.contextMenus.create({
      title: 'Search Letterboxd',
      contexts: ['selection'],
      id: 'searchLetterboxdContextMenu'
    });
    
    contextMenuItemCreated = true;
  }
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'searchLetterboxdContextMenu') {
    chrome.tabs.create({url: 'https://letterboxd.com/search/films/' + encodeURIComponent(info.selectionText)});
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getSelectedText') {
    sendResponse({selectedText: window.getSelection().toString()});
  }
});
