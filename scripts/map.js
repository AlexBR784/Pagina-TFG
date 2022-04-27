var map = null;
const search = document.getElementById("search");
const filterPiedra = document.getElementById("filterPiedra");
const filterMarmol = document.getElementById("filterMarmol");
const filterBronce = document.getElementById("filterBronce");
var markers = [];
var xhr = new XMLHttpRequest();

fetch("../json/esculturas.json")
  .then((response) => response.json())
  .then((json) => crearMapa(json));

function crearMapa(json) {
  map = L.map("map").setView([39.47, -0.37], 14);
  var leafletIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4054/4054732.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiYWxleGJyNzg0IiwiYSI6ImNrenRtd3B6czBpbnMydmw2eG5kM2JmdGkifQ.sdRTgU8nDHXuqqNS9q1aUQ",
    }
  ).addTo(map);

  for (var i = 0; i < json.Esculturas.length; i++) {
    marker = L.marker(json.Esculturas[i].coordenadas, {
      title: json.Esculturas[i].nombre,
      alt: json.Esculturas[i].nombre,
      material: json.Esculturas[i].tipo,
      draggable: false,
      icon: leafletIcon,
      id: i,
    });

    markers.push(marker);
    map.addLayer(marker);
  }

  markers.forEach((m) => {
    m.on("click", function () {
      console.log(m.options.title.replace(/ /g, "_"));
      redirectTo(m.options.title.replace(/ /g, "_"));
    });
  });

  filterPiedra.addEventListener("click", function(){filterMat("Piedra")}, false) //Llamando a la funcion dentro de una funcion evitamos que se llame automaticamente
  filterBronce.addEventListener("click", function(){filterMat("Bronce")}, false) //Llamando a la funcion dentro de una funcion evitamos que se llame automaticamente
  filterMarmol.addEventListener("click", function(){filterMat("Mármol")}, false) //Llamando a la funcion dentro de una funcion evitamos que se llame automaticamente

  

  Init(json);
}

function filterMat(f){
  for (var i = 0; i < markers.length; i++){
    if(markers[i].options.material != f){
      map.removeLayer(markers[i]);
    } else {
      if (!map.hasLayer(markers[i])) {
        map.addLayer(markers[i]);
      }
    }
  }
}


function Init(json) {
  search.addEventListener("input", () => {
    if (search.value != "") {
      showPopup()
      for (var i = 0; i < json.Esculturas.length; i++) {
        if (
          !markers[i].options.title
            .toLowerCase()
            .includes(search.value.toLowerCase())
        ) {
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
