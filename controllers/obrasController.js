var express = require("express");
var app = express();
const mysql = require("mysql2");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
var { format } = require("date-fns");

const controller = {
  //Verifica las obras existentes y si el obrero ya dio el presente hoy muestra el boton dar salida en vez del dar asistencia
  mostrarObras: function (req, res) {
    connection.query(
      "SELECT * FROM obras",
      function (error, arrayObras, fields) {
        connection.query(
          "SELECT idUsuarios FROM usuarios WHERE username = ?",
          [req.session.username],
          function (error, idObrero, fields) {
            let date = new Date();
            let fechaHoy = format(date, "yyyy-MM-dd");
            connection.query(
              "SELECT * FROM asistencias WHERE fecha = ? AND idObrero = ?",
              [fechaHoy, idObrero[0].idUsuarios],
              function (error, arrayAsistencias, fields) {
                console.log(arrayAsistencias);
                let asistenciasActivas = arrayAsistencias.find(
                  (o) => o.idobra != 0
                );
                console.log(asistenciasActivas);
                if (arrayAsistencias.horaSalida != 0) {
                  res.render("obras", {
                    obras: arrayObras,
                    obrero: idObrero[0].idUsuarios,
                    asistido: arrayAsistencias,
                  });
                } else {
                  res.render("obras", {
                    obras: arrayObras,
                    obrero: idObrero[0].idUsuarios,
                    asistido: 0,
                  });
                }
              }
            );
          }
        );
      }
    );
  },

  //Ingresa la asistencia a la DB con los datos del obrero y si esto da error se asume que ya habia dado asistencia por lo que da la salida del dia. Si ya se dio la salida no se volvera a mostrar el boton por lo que no entra en un loop
  asistirAObra: function (req, res) {
    let bandera = 0;
    let { obra, obrero, nuevo } = req.body;
    let date = new Date();
    let fecha = format(date, "yyyy-MM-dd");
    let hora = format(date, "HH:mm:ss");
    connection.query(
      "INSERT INTO asistencias VALUES (?, ?, ?, ?, ?)",
      [obra, obrero, fecha, hora, 0],
      function (error, results, fields) {
        if (error) {
          connection.query(
            "SELECT idUsuarios FROM usuarios WHERE username = ?",
            [req.session.username],
            function (error, idObrero, fields) {
              let date = new Date();
              let fechaHoy = format(date, "yyyy-MM-dd");
              let hora = format(date, "HH:mm:ss");
              connection.query(
                "UPDATE asistencias SET horaSalida = ? WHERE fecha = ? AND idObrero = ? AND idObra = ?",
                [hora, fechaHoy, idObrero[0].idUsuarios, parseInt(obra)],
                function (error, arrayObras, fields) {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            }
          );
          console.log("tiene que dar salida antes de dar otra entrada");
        }
        res.redirect("/obras");
      }
    );
  },
};

module.exports = controller;
