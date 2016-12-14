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

  return `${month} ${date}, ${hour}:${minute} ${ampm}`;
}

$(document).ready(function() {
  const hylites = JSON.parse(localStorage.hylites);
  for (let i = 0; i < hylites.length; i++) {
    const date = formatDateTime(hylites[i].date);

    const html = `<div class="hylite">
                    <div class="quote">
                      <p>${hylites[i].quote}</p>
                    </div>
                    <div class="date">
                      <p>${date}</p>
                    </div>
                    <div class="delete">
                      <img src="delete.png" width="30" height="30">
                    </div>
                  </div>`;
    $("#hylites").append(html);
  }
});
