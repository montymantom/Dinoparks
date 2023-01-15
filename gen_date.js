const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var today = new Date();
var day = today.getDate();
var month = monthNames[today.getMonth()];
var year = today.getFullYear();
document.getElementById("date").innerHTML = day + " " + month + " " + year;
