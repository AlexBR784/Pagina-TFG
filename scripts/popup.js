var alert = document.getElementById("alert_popup");
var info = document.getElementById("mobile_info");
var infobtn = document.getElementById("help_mobile");
var appeared = false;

/**
 * Delay devuelve una promesa que se resuelve despues de un tiempo.
 * @param time - Tiempo en milisegundos.
 * @returns Promise.
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


function showPopup() {
  if (alert.classList.contains("invisible") && !appeared) {
    alert.classList.toggle("invisible");

    delay(2250).then(() => alert.classList.toggle("invisible"));
    appeared = true;
  }
}

infobtn.onclick = () => {
  if (!info.classList.contains("visible") && info.classList.contains("invisibleinfo")) {
    info.classList.toggle("visible");
    info.classList.toggle("invisibleinfo");
  } else if (!info.classList.contains("invisibleinfo") && info.classList.contains("visible")) {
    info.classList.toggle("visible");
    info.classList.toggle("invisibleinfo");
  }
};
