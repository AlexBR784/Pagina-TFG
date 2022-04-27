var icon_lateral_menu = document.querySelector(".fa-bars");
var icon_lateral_menu_container = document.querySelector(
  "#hamburger-icon-container"
);
const side_menu = document.getElementById("side_menu");
var open = false;

icon_lateral_menu_container.addEventListener("click", () => {
  icon_lateral_menu.classList.toggle("fa-bars");
  icon_lateral_menu.classList.toggle("fa-times");

  icon_lateral_menu.classList.toggle("icon-rotate");
  if (side_menu.classList.contains("disabled")) {
    side_menu.classList.toggle("disabled");
    side_menu.classList.toggle("active");
  } else if (side_menu.classList.contains("active")) {
    side_menu.classList.toggle("disabled");
    side_menu.classList.toggle("active");
  }
});

// Si no tiene rotar, esta en barras y tiene inversa
// Si tiene rotar, esta en cruz
