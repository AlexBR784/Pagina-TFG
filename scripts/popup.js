var alert = document.getElementById("alert_popup");
var info = document.getElementById("mobile_info");
var infobtn = document.getElementById("help_mobile");
var appeared = false;

/**
 * Delay returns a promise that resolves after a given time.
 * @param time - The time in milliseconds to delay the promise.
 * @returns A promise that resolves after a certain amount of time.
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * If the alert is invisible and hasn't appeared yet, make it visible, wait 2.25 seconds, then make it
 * invisible again.
 */
function showPopup() {
  if (alert.classList.contains("invisible") && !appeared) {
    alert.classList.toggle("invisible");

    delay(2250).then(() => alert.classList.toggle("invisible"));
    appeared = true;
  }
}

/* A function that is called when the button is clicked. It checks if the info div is visible or not,
and if it is, it makes it invisible, and if it is not, it makes it visible. */
infobtn.onclick = () => {
  if (!info.classList.contains("visible") && info.classList.contains("invisibleinfo")) {
    info.classList.toggle("visible");
    info.classList.toggle("invisibleinfo");
  } else if (!info.classList.contains("invisibleinfo") && info.classList.contains("visible")) {
    info.classList.toggle("visible");
    info.classList.toggle("invisibleinfo");
  }
};
