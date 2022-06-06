var time_display = document.querySelector("#time-display");
var date;
var zeroM = "";
var zeroS = "";
var zeroH = "";

RefreshTime();

/**
 * It gets the current date and time, and then displays it in the HTML element with the id
 * "time_display".
 */
function RefreshTime() {
  date = new Date();
  if (date.getSeconds() < 10) zeroS = "0";
  else zeroS = "";
  if (date.getMinutes() < 10) zeroM = "0";
  else zeroM = "";
  if (date.getHours() < 10) zeroH = "0";
  else zeroH = "";
  time_display.innerHTML = `Fecha: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}; Hora:${zeroH}${date.getHours()}:${zeroM}${date.getMinutes()}:${zeroS}${date.getSeconds()} `;
  UpdateTime();
}

/**
 * It updates the time every second.
 */
function UpdateTime() {
  var refresh = 1000;
  setTimeout("RefreshTime()", refresh);
}
