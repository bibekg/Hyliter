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
                        <a title=" ${h.source_title}" href="${h.source_url}">
                          <img src="${h.source_icon_url}">
                        </a>
                      </div>
                      <div class="date container">
                        <p>${date.date}<br>${date.time}</p>
                      </div>
                      <div class="quote container">
                        <p>${h.selection}</p>
                      </div>
                      <div class="delete container">
                        <i class="material-icons">close</i>
                      </div>
                    </div>`;
    }
  }

  $("#hylites").append(html);
  bindDeleteHandler();
  bindLinkHandler();
}

function bindDeleteHandler() {
  $(".delete i").click(function() {

    // Get corresponding hylite index and remove
    // it from local storage
    const hylite = $(this).parents(".hylite")[0];
    const num = hylite.id.substr(7);
    let hylites = getHylites();
    hylites.splice(num, 1);
    saveHylites(hylites);

    populateHylites();
  });
}

function bindLinkHandler() {
  $(".context a").click(function() {
    chrome.tabs.create({url: $(this).attr("href")})
  });
}

$(document).ready(function() {
  populateHylites();
});
