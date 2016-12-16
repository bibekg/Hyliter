const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatDateTime(d) {
  d = new Date(d);
  const month = monthNames[d.getMonth()];
  const date  = d.getDate();

  let hour = d.getHours();
  let ampm = "am";
  if (hour > 12) {
    ampm = "pm";
  }
  hour %= 12;
  if (hour === 0) {
    hour = 12;
  }
  let minute = d.getMinutes();
  if (minute >= 0 && minute < 10) {
    minute = `0${minute}`;
  }

  return {
    date: `${month} ${date}`,
    time: `${hour}:${minute} ${ampm}`
  }
}

function getHylites() {
  const h = localStorage.hylites;
  if (h) {
    return JSON.parse(h);
  } else {
    return undefined;
  }
}

function saveHylites(h) {
  localStorage.hylites = JSON.stringify(h);
}

function populateHylites() {

  $("#hylites").html("");

  const hylites = getHylites();

  let html;
  if (!hylites || hylites.length === 0) {
    html = `<h1 id="title">
              You don't have any Hylites saved.<br>
              Select text, right-click, and Hylite.
            </h1>`;
  } else if (hylites) {

    html = `<h1 id="title">Your Hylites</h1>`;

    for (let i = 0; i < hylites.length; i++) {
      const h = hylites[i];
      const date = formatDateTime(h.date);

      html += `<div class="hylite" id="hylite-${i}">
                      <div class="context container">
                        ${h.context_html}
                      </div>
                      <div class="date container">
                        <p>${date.date}<br>${date.time}</p>
                      </div>
                      <div class="quote container">
                        <p contentEditable>${h.selection}</p>
                      </div>
                      <div class="actions container">
                        <div class="revert">
                          <i title="Revert" class="material-icons">undo</i>
                        </div>
                        <div class="delete">
                          <i title="Delete" class="material-icons">close</i>
                        </div>
                      </div>
                    </div>`;
    }
  }

  $("#hylites").append(html);

  // Bind handlers that have new targets as a
  // result of hylite repopulation
  bindDeleteHandler();
  bindLinkHandler();
  bindUndoHandler();
}

function bindDeleteHandler() {
  $(".delete i").click(function() {

    // Get corresponding hylite index and remove
    // it from local storage
    const id = $(this).parents(".hylite")[0].id.substr(7);
    let hylites = getHylites();
    hylites.splice(id, 1);
    saveHylites(hylites);

    populateHylites();
  });
}

function bindUndoHandler() {
  $(".revert").click(function() {
    const id = $(this).parents(".hylite")[0].id.substr(7);
    let hylites = getHylites();
    hylites[id].selection = hylites[id].originalSelection;
    saveHylites(hylites);

    populateHylites();
  })
}

function bindLinkHandler() {
  $(".context a").click(function() {
    chrome.tabs.create({url: $(this).attr("href")})
  });
}

function bindNewHyliteHandler() {
  $("#new-hylite").click(function() {
    addToStorage({
      originalSelection: "New note",
      selection: "New note",
      context_html: `<i class="material-icons note-icon">person</i>`,
      date: Date()
    });

    populateHylites();
  });
}

function bindSaveChangesHandler() {
  $(window).on("keyup", function() {
    let hylites = getHylites();
    let hs = $(".hylite .quote p");
    for (let i = 0; i < hs.length; i++) {
      hylites[i].selection = hs[i].innerHTML;
    }
    saveHylites(hylites);
  });
}

function addToStorage(hylite) {
  let hylites;
  if (localStorage.hylites) {
    hylites = JSON.parse(localStorage.hylites);
  } else {
    hylites = [];
  }

  hylites.push(hylite);
  console.log(hylites);
  localStorage.hylites = JSON.stringify(hylites);
}

$(document).ready(function() {
  bindNewHyliteHandler();
  bindSaveChangesHandler();
  populateHylites();
});
