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
  return JSON.parse(localStorage.hylites);
}

function saveHylites(h) {
  localStorage.hylites = JSON.stringify(h);
}

function populateHylites() {

  $("#hylites").html("");

  const hylites = getHylites();
  for (let i = 0; i < hylites.length; i++) {
    const date = formatDateTime(hylites[i].date);

    const html = `<div class="hylite" id="hylite-${i}">
                    <div class="quote">
                      <p>${hylites[i].quote}</p>
                    </div>
                    <div class="date">
                      <p>${date.date}</p>
                      <p>${date.time}</p>
                    </div>
                    <div class="delete">
                      <i class="material-icons">close</i>
                    </div>
                  </div>`;

    $("#hylites").append(html);
  }

  bindDeleter();
}

function bindDeleter() {
  $(".delete").click(function() {
    const parent = $(this).parents()[0];
    const id = parent.id;
    const num = id.substr(7);

    let hylites = getHylites();
    hylites.splice(num, 1);
    saveHylites(hylites);
    populateHylites();
  });
}

$(document).ready(function() {
  populateHylites();
});
