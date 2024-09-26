document.addEventListener('DOMContentLoaded', function() {
  var searchTimingSelect = document.getElementById('searchTiming');

  chrome.storage.sync.get(['searchTiming'], function(result) {
    var searchTiming = result.searchTiming || 'Now';
    searchTimingSelect.value = searchTiming;
  });

  searchTimingSelect.addEventListener('change', function() {
    chrome.storage.sync.set({searchTiming: searchTimingSelect.value}, function() {
      console.log('Search timing is set to ' + searchTimingSelect.value + '.');
    });
  });
});
