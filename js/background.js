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
    id: hyliter.getNewId(),
    originalSelection: info.selectionText,
    selection: info.selectionText,
    context_html: `<a title = "${tab.title}" href="${tab.url}">
                    <img src="${tab.favIconUrl}">
                  </a>`,
    date: Date()
  });
})
//
// function addToStorage(hylite) {
//   let hylites;
//   if (localStorage.hylites) {
//     hylites = JSON.parse(localStorage.hylites);
//   } else {
//     hylites = [];
//   }
//
//   hylites.push(hylite);
//   console.log(hylites);
//   localStorage.hylites = JSON.stringify(hylites);
// }
