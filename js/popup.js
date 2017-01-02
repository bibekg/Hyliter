// popup.js

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

  // Sort hylites in newest-first order
  hylites.sort((a,b) => new Date(b.date) - new Date(a.date));

  $(selector).html("");

  var html;
  if (!hylites || hylites.length === 0) {
    html = `<h1 id="title">
              You don't have any Hylites saved.<br>
              Select text, right-click, and Hylite.
            </h1>`;
  } else if (hylites) {

    html = `<h1 id="title">Your Hylites</h1>`;

    // Render each hylite to the DOM
    for (var i = 0; i < hylites.length; i++) {
      var h = hylites[i];
      var date = formatDateTime(h.date);

      html += `<div class="hylite" id="hylite-${h.id}">`;

      // Context: dependent on note or hylite
      html +=   `<div class="context container">`
      switch (h.type) {
        case 'note':
          html += `<i class="material-icons note-icon">person</i>`;
          break;
        case 'hylite':
          html += `<a title = "${h.sourceTitle}" href="${h.sourceUrl}">
                    <img src="${h.sourceFaviconUrl}">
                  </a>`
      }
      html +=   `</div>`

      // Date
      html +=   `<div class="date container">
                  <p>${date.date}<br>${date.time}</p>
                </div>`

      // Main hylite content
      html += `<div class="quote container">`

      switch (h.type) {
        case 'note':
          html += `<textarea rows="5" placeholder="New note">${h.selection}</textarea>`;
          break;
        case 'hylite':
          html += `<textarea rows="5" placeholder="Undo for original hylite">${h.selection}</textarea>`
      }
      html += `</div>`

      // Actions
      html += `<div class="actions container">`

      if (h.type !== 'note') {
        html +=  `<div class="revert">
                    <i title="Revert" class="material-icons">undo</i>
                  </div>`
      }
      html +=   `<div class="delete">
                  <i title="Delete" class="material-icons">close</i>
                </div>
              </div>`

      html += `</div>`;
    }
  }

  $("#hylites").append(html);

  // Bind handlers that have new targets as a
  // result of hylite repopulation
  bindDeleteHandler();
  bindLinkHandler();
  bindRestoreHandler();
}

function bindDeleteHandler() {
  $(".delete i").click(function () {

    // Get corresponding hylite index and remove it from local storage
    var id = parseInt($(this).parents(".hylite")[0].id.substr(7));
    hyliter.remove(id);
    populateHylites(hyliter.hylites(), "#hylites");
  });
}

function bindRestoreHandler() {
  $(".revert").click(function () {
    var id = parseInt($(this).parents(".hylite")[0].id.substr(7));
    hyliter.restore(id);
    populateHylites(hyliter.hylites(), "#hylites");
  });
}

function bindLinkHandler() {
  $(".context a").click(function () {
    chrome.tabs.create({ url: $(this).attr("href") });
  });
}

function bindNewHyliteHandler() {
  $("#new-hylite").click(function () {
    hyliter.add({
      type: "note",
      selection: ""
    });
    populateHylites(hyliter.hylites(), "#hylites");
  });
}

function bindSaveChangesHandler() {
  $("textarea").keyup(function () {
    const h = $(this).parents(".hylite")[0];
    const id = parseInt(h.id.substr(7));
    hyliter.update(id, $(this).val());
  });
}

$(document).ready(function() {
    hyliter.init();
    populateHylites(hyliter.hylites(), "#hylites");
    bindSaveChangesHandler();
    bindNewHyliteHandler();
});
