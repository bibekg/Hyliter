chrome.contextMenus.create({
  "title": "Hylite"
  , "contexts": ["selection"]
});

chrome.contextMenus.onClicked.addListener( function(info, tab) {
  addToStorage(info.selectionText);
})

function addToStorage(text) {
  let hylites;
  if (localStorage.hylites) {
    hylites = JSON.parse(localStorage.hylites);
  } else {
    hylites = [];
  }

  let hylite = {
    quote: text,
    date: Date()
  }

  hylites.push(hylite);
  console.log(hylites);
  localStorage.hylites = JSON.stringify(hylites);
}
