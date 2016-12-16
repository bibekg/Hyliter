chrome.contextMenus.create({
  "title": "Hylite"
  , "contexts": ["selection"]
});

chrome.contextMenus.onClicked.addListener( function(info, tab) {
  addToStorage({
    originalSelection: info.selectionText,
    selection: info.selectionText,
    context_html: `<a title = "${tab.title}" href="${tab.url}">
                    <img src="${tab.favIconUrl}">
                  </a>`,
    date: Date()
  });
})

function addToStorage(hylite) {
  let hylites;
  if (localStorage.hylites) {
    hylites = JSON.parse(localStorage.hylites);
  } else {
    hylites = [];
  }
  //
  // let hylite = {
  //   quote: obj.selection,
  //   source: url,
  //   date: Date()
  // }

  hylites.push(hylite);
  console.log(hylites);
  localStorage.hylites = JSON.stringify(hylites);
}
