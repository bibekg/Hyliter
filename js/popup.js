$(document).ready(function() {
    hyliter.init();
    h = hyliter.hylites();

    // Now populate DOM with h
    console.log(h);
    populateHylites(h, "#hylites");
});

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateTime(d) {
  d = new Date(d);
  var month = monthNames[d.getMonth()];
  var date = d.getDate();

  var hour = d.getHours();
  var ampm = "am";
  if (hour > 12) {
    ampm = "pm";
  }
  hour %= 12;
  if (hour === 0) {
    hour = 12;
  }
  var minute = d.getMinutes();
  if (minute >= 0 && minute < 10) {
    minute = "0" + minute;
  }

  return {
    date: month + " " + date,
    time: hour + ":" + minute + " " + ampm
  };
}

function populateHylites(hylites, selector) {

  $(selector).html("");

  var html = void 0;
  if (!hylites || hylites.length === 0) {
    html = `<h1 id="${title}">
              You don't have any Hylites saved.<br>
              Select text, right-click, and Hylite.
            </h1>`;
  } else if (hylites) {

    html = "<h1 id=\"title\">Your Hylites</h1>";

    for (var i = 0; i < hylites.length; i++) {
      var h = hylites[i];
      var date = formatDateTime(h.date);

      html += `<div class="${hylite}" id="${hylite}-${i}">
                <div class=\"context container\">
                    " + h.context_html + "
                </div>
                <div class=\"date container\">
                  <p>" + date.date + "<br>" + date.time + "</p>
                </div>
                <div class=\"quote container\">
                  <p contentEditable>" + h.selection + "</p>
                </div>
                <div class=\"actions container\">
                  <div class=\"revert\">
                    <i title=\"Revert\" class=\"material-icons\">undo</i>
                  </div>
                  <div class=\"delete\">
                    <i title=\"Delete\" class=\"material-icons\">close</i>
                  </div>
                </div>
              </div>`;
    }
  }

  $("#hylites").append(html);

  // Bind handlers that have new targets as a
  // result of hylite repopulation
  bindDeleteHandler();
  // bindLinkHandler();
  // bindUndoHandler();
}

function bindDeleteHandler() {
  $(".delete i").click(function () {

    // Get corresponding hylite index and remove
    // it from local storage
    var id = $(this).parents(".hylite")[0].id.substr(7);
    hyliter.remove()

    var hylites = downloadHylites();
    hylites.splice(id, 1);
    saveHylites(hylites);

    populateHylites();
  });
}

function bindUndoHandler() {
  $(".revert").click(function () {
    var id = $(this).parents(".hylite")[0].id.substr(7);
    var hylites = downloadHylites();
    hylites[id].selection = hylites[id].originalSelection;
    saveHylites(hylites);

    populateHylites();
  });
}

function bindLinkHandler() {
  $(".context a").click(function () {
    chrome.tabs.create({ url: $(this).attr("href") });
  });
}

function bindNewHyliteHandler() {
  $("#new-hylite").click(function () {
    addToStorage({
      originalSelection: "New note",
      selection: "New note",
      context_html: "<i class=\"material-icons note-icon\">person</i>",
      date: Date()
    });
  });
}

function bindSaveChangesHandler() {
  $(window).on("keyup", function () {
    var hylites = downloadHylites();
    var hs = $(".hylite .quote p");
    for (var i = 0; i < hs.length; i++) {
      hylites[i].selection = hs[i].innerHTML;
    }
    saveHylites(hylites);
  });
}
