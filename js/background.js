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
})
