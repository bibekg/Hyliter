chrome.contextMenus.create({
  "title": "Hylite"
  , "contexts": ["selection"]
});

chrome.contextMenus.onClicked.addListener( function(info, tab) {
  addToStorage({
    selection: info.selectionText,
    source_title: tab.title,
    source_url: tab.url,
    source_icon_url: tab.favIconUrl,
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
