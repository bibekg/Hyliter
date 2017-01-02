// background.js

// Create context menu button
chrome.contextMenus.create({
  "title": "Hylite"
  , "contexts": ["selection"]
});

// Add hylite to store on context menu button click
chrome.contextMenus.onClicked.addListener( function(info, tab) {
  hyliter.init();
  hyliter.add({
    selection: info.selectionText,
    type: "hylite",
    sourceTitle: tab.title,
    sourceUrl: tab.url,
    sourceFaviconUrl: tab.favIconUrl
  });

  // Message content.js to indicate hylite completed

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "success"}, function(response) {
    console.log(response.farewell);
  });
});

})
