/* A JavaScript function that is called when the fullscreen button is clicked. It toggles the class of
the map container between notfullScreenMap and fullscreenMap. */
const fullScreenBtn = document.getElementById("fullscreen");
const mapContainer = document.getElementById("map_container");

fullScreenBtn.addEventListener("click", () => {
  if (mapContainer.classList.contains("notfullScreenMap")) {
    mapContainer.classList.toggle("notfullScreenMap");
    mapContainer.classList.toggle("fullscreenMap");
    if (map != null) {
      map.invalidateSize();
    }
  } else if (!mapContainer.classList.contains("notfullScreenMap")) {
    mapContainer.classList.toggle("notfullScreenMap");
    mapContainer.classList.toggle("fullscreenMap");
  }
});
