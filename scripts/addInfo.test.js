const fs = require("fs");

const data = fs.readFileSync("../json/esculturas.test.json");

const esculturas = JSON.parse(data);

/*
*{
      "nombre": "Neptuno",
      "autor": "Ponzanelli",
      "tipo": "E márm.",
      "localizacion": "Parque del parterre",
      "coordenadas": [39.471512684101775, -0.37056103569225013]
    }
*
*
*/

const MAX = 1000;
esculturas.Esculturas = [];
for (var i = 0; i < MAX; i++) {
  obj = {
    nombre: "dummy",
    autor: "dummy",
    tipo: "dummy",
    localizacion: "dummy",
    coordenadas: [randomNumber(39.45, 39.48), randomNumber(-0.4, -0.35)],
  };

  esculturas.Esculturas.push(obj);
  obj = {};
}

/* Converting the object into a string and writing it into the file. */
let datos = JSON.stringify(esculturas, null, 2);
fs.writeFileSync("../json/esculturas.test.json", datos);

/**
 * It returns a random number between the minimum and maximum values you pass to it.
 * @param min - The minimum number that can be returned.
 * @param max - The maximum number you want to generate.
 * @returns A random number between the min and max values.
 */
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
