document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('searchButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var selectedText = "";
      chrome.tabs.sendMessage(tabs[0].id, {action: "getSelectedText"}, function(response) {
        selectedText = response.selectedText;
        if (selectedText) {
          chrome.tabs.create({url: "https://letterboxd.com/search/films/" + encodeURIComponent(selectedText)});
        }
      });
    });
  });
});
