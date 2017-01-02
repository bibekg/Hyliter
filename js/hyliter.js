// hyliter.js

var hyliter = function () {

  /* Private */

  var hylites;

  /* Hylite object contains:
      * id
      * date
      * originalSelection
      * selection
      * type: {note, hylite}

   * If type: note
      * display note-icon

  * If type: hylite
      * also contains:
          * sourceUrl
          * sourceTitle
          * sourceFaviconUrl
      * display context icon/link
  */

  function downloadHylites() {
    var h = localStorage.hylites;
    if (h) {
      return JSON.parse(h);
    } else {
      return [];
    }
  }

  function saveHylites() {
    localStorage.hylites = JSON.stringify(hylites);
  }

  /* Public */

  function init() {
    hylites = downloadHylites();
  }

  function getNewId() {
    let ids = hylites.map((x) => x.id).sort((a,b) => (a-b));

    // Search for smallest nonnegative id not already in use
    for (var i = 0; i < ids.length; i++) {
      if (ids[i] != i) { return i; }
    }

    // All ID's linearly used
    return ids.length;
  }

  function addToStorage(hylite) {
    hylite.id = getNewId();
    hylite.date = Date();
    hylite.originalSelection = hylite.selection;

    hylites.push(hylite);
    saveHylites();
  }

  function removeFromStorage(id) {
    // Filter out the hylite with specified id
    hylites = hylites.filter(function(x) {
      return (x.id !== id);
    });
    saveHylites();
  }

  function getHylites() {
    if (!hylites) { downloadHylites(); }
    return hylites;
  }

  // Restores hylite text to originally hylited text
  function restoreHylite(id) {
    const index = hylites.findIndex(x => (x.id === id));
    hylites[index].selection = hylites[index].originalSelection;
    saveHylites();
  }

  // Updates hylite store when DOM version of hylite is changed
  function updateHylite(id, newText) {
    const index = hylites.findIndex(x => (x.id === id));
    hylites[index].selection = newText;
    hylites[index].date = Date();
    saveHylites();
  }

  return {
    init: init,
    add: addToStorage,
    remove: removeFromStorage,
    restore: restoreHylite,
    update: updateHylite,
    hylites: getHylites
  };
}();
