"use strict";

var hyliter = function () {

  /* Private */

  var hylites;

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

  function downloadHylites() {
    var h = localStorage.hylites;
    if (h) {
      return JSON.parse(h);
    } else {
      return [];
    }
  }

  function saveHylites(hylites) {
    localStorage.hylites = JSON.stringify(hylites);
  }

  /* Public */

  function init() {
    hylites = downloadHylites();
  }

  function getNewId() {
    // Get the lowest number id that doesn't exist in hylite store
    console.log(hylites);
    let ids = hylites.map((x) => x.id);
    // for (let i = 0; i < hylites.length; i++) {
    //   let id = hylites[i].id;
    //   ids.push(id);
    // }

    // Sort ids numerically
    ids.sort( (a, b) => a - b );

    // Search for smallest nonnegative id not already in use
    for (var i = 0; i < ids.length; i++) {
      if (ids[i] != i) { return i; }
    }

    return ids.length;
  }

  function addToStorage(hylite) {
    var hylites = void 0;
    if (localStorage.hylites) {
      // Grab hylite store if it exists
      hylites = JSON.parse(localStorage.hylites);
    } else {
      // Create hylite store if it doesn't exist
      hylites = [];
    }

    hylites.push(hylite);

    // Save hylites to hylite store
    localStorage.hylites = JSON.stringify(hylites);
  }

  function removeFromStorage(id) {
    // Filter out the hylite with specified id
    hylites = hylites.filter(function(x) {
      return (x !== id);
    });
  }

  function getHylites() {
    return hylites;
  }

  return {
    init: init,
    add: addToStorage,
    remove: removeFromStorage,
    hylites: getHylites,
    getNewId: getNewId,
  };
}();

$(document).ready(function () {
  hyliter.init();
});
