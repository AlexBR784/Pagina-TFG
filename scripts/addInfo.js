const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const data = fs.readFileSync("../json/esculturas.json");

const esculturas = JSON.parse(data);

var nombre, autor, tipo, loc, coords;
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

console.log(esculturas.Esculturas);
readline.question("Nombre: ", (nombre) => {
  this.nombre = nombre;
  readline.question("Autor: ", (autor) => {
    this.autor = autor;
    readline.question("Tipo: ", (tipo) => {
      this.tipo = tipo;
      readline.question("Localizacion: ", (loc) => {
        this.loc = loc;
        readline.question("Coordenadas: ", (coords) => {
          this.coords = coords;

          obj = {
            nombre: this.nombre,
            autor: this.autor,
            tipo: this.tipo,
            localizacion: this.loc,
            coordenadas: JSON.parse("[" + this.coords + "]"),
          };

          esculturas.Esculturas.push(obj);
          obj = {};
          let datos = JSON.stringify(esculturas, null, 2);

          fs.writeFileSync("../json/esculturas.json", datos);
          readline.close();
        });
      });
    });
  });
});
