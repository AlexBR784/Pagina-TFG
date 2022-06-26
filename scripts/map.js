var map = null;
const search = document.getElementById("search");
const filterPiedra = document.getElementById("filterPiedra");
const filterMarmol = document.getElementById("filterMarmol");
const filterBronce = document.getElementById("filterBronce");
var materialFiltered = false;

/* An array that stores all the markers. */
var markers = [];
/* A global variable that stores the URL of the Google Maps page. */
var mapsUrl = "";
/* Creating a new XMLHttpRequest object. */
var xhr = new XMLHttpRequest();

/* A constant that stores the path to the JSON file. */
const JSONpath = "../json/esculturas.json";

/* Fetching the JSON file and then calling the function crearMapa with the JSON file as a parameter. */
fetch(JSONpath)
  .then((response) => response.json())
  .then((json) => crearMapa(json));

/**
 * It creates a map, adds markers to it, and adds event listeners to the markers.
 * @param json - the json file
 */
function crearMapa(json) {
  map = L.map("map").setView([39.47, -0.37], 14);
  var leafletIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4054/4054732.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiYWxleGJyNzg0IiwiYSI6ImNrenRtd3B6czBpbnMydmw2eG5kM2JmdGkifQ.sdRTgU8nDHXuqqNS9q1aUQ",
  }).addTo(map);

  for (var i = 0; i < json.Esculturas.length; i++) {
    marker = L.marker(json.Esculturas[i].coordenadas, {
      title: json.Esculturas[i].nombre,
      alt: json.Esculturas[i].nombre,
      material: json.Esculturas[i].tipo,
      draggable: false,
      icon: leafletIcon,
      location: json.Esculturas[i].coordenadas[0] + "," + json.Esculturas[i].coordenadas[1],
      id: i,
    });
    marker.bindPopup(
      `
      <style> td:nth-child(2n),th:nth-child(2n){border-left: 3px solid #adadad;}
      td,th{padding:2px;}
      </style>
      <table style='border-spacing: 0px;'>
      <tbody>
        <tr style='background-color: #d1d1d1'>
          <th>Nombre</th>
          <th>${json.Esculturas[i].nombre}</th>
        </tr>
        <tr>
          <td>Autor</td>
          <td>${json.Esculturas[i].autor}</td>
        </tr>
        <tr style='background-color: #d1d1d1'>
          <th>Material</th>
          <th>${json.Esculturas[i].tipo}</th>
        </tr>
        <tr>
          <td>Loc.</td>
          <td>${json.Esculturas[i].localizacion}</td>
        </tr>
      </tbody>
      </table>`
    );

    marker.on("mouseover", function (e) {
      this.openPopup();
    });

    marker.on("mouseout", function (e) {
      this.closePopup();
    });

    markers.push(marker);
    map.addLayer(marker);
  }

  markers.forEach((m) => {
    m.on("click", function () {
      console.log(m.options.title.replace(/ /g, "_"));
      mapsUrl = `https://www.google.com.sa/maps/search/${m.options.location}?hl=es`;
      localStorage.setItem("MapsLocation", mapsUrl);
      redirectTo(m.options.title.replace(/ /g, "_"));
    });
  });

  filterPiedra.addEventListener(
    "click",
    function () {
      filterMat("Piedra");
    },
    false
  ); //Llamando a la funcion dentro de una funcion evitamos que se llame automaticamente
  filterBronce.addEventListener(
    "click",
    function () {
      filterMat("Bronce");
    },
    false
  ); //Llamando a la funcion dentro de una funcion evitamos que se llame automaticamente
  filterMarmol.addEventListener(
    "click",
    function () {
      filterMat("Mármol");
    },
    false
  ); //Llamando a la funcion dentro de una funcion evitamos que se llame automaticamente

  Init(json);
}

/**
 * If the material is not equal to the filter, remove the marker from the map. If the material is equal
 * to the filter, add the marker to the map
 * @param f - the material to filter by
 */
function filterMat(f) {
  materialFiltered = true;
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].options.material != f) {
      map.removeLayer(markers[i]);
    } else {
      if (!map.hasLayer(markers[i])) {
        map.addLayer(markers[i]);
      }
    }
  }
}

/**
 * Once this function Init is called, it adds listeners to the search input HTML element showing an alert if needed
 * and only showing the markers with ID/name equal to the input value
 * @param json - the JSON file with the sculptures information
 */
function Init(json) {
  search.addEventListener("input", () => {
    if (search.value != "") {
      if (materialFiltered) showPopup();
      materialFiltered = false;
      for (var i = 0; i < json.Esculturas.length; i++) {
        if (!markers[i].options.title.toLowerCase().includes(search.value.toLowerCase())) {
          map.removeLayer(markers[i]);
        } else {
          if (!map.hasLayer(markers[i])) {
            map.addLayer(markers[i]);
          }
        }
      }
      console.log(map);
    } else {
      appeared = false; //Variable de otro script
      for (var i = 0; i < json.Esculturas.length; i++) map.addLayer(markers[i]);
    }
  });
}

/**
 * It redirects the user to a page, and if the page doesn't exist, it redirects the user to an error
 * page.
 * @param page - The page ID you want to redirect to.
 */
function redirectTo(page) {
  xhr.open("head", "./pages/" + page + ".html");
  xhr.send(null);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.location.href = "./pages/" + page + ".html";
    } else {
      window.location.href = "./pages/error.html";
    }
  };
}
