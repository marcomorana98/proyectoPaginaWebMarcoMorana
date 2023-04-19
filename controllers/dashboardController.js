var express = require("express");
var app = express();
const mysql = require("mysql2");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
var { format } = require("date-fns");

const controller = {
  mostrarDashboard: function (request, res) {
    res.render("dashboard");
  },

  obtenerDatos: function (req, res) {
    connection.query(
      'SELECT a.fecha, u.legajo, a.`hora entrada` as entrada, a.`hora salida` as salida, concat(o.direccion," ", o.altura) as direccion, concat(u.nombre, " ", u.apellido) as nombre from asistencias as a join usuarios as u on a.idobrero=u.idUsuarios join obras as o on a.idobra=o.idObra WHERE a.fecha = ?',
      [req.query.fecha],
      function (error, asistencias, fields) {
        if (error) {
          console.log(error);
        }
        /*let currentDay = req.query.fecha;
        console.log(currentDay);
        console.log(asistencias);
        let delDia = [];
        for (let i = 0; asistencias.length > i; i++) {
          console.log(asistencias[i].fecha.toDateString());
          if (format(asistencias[i].fecha, "yyyy-MM-dd") == currentDay) {
            delDia.push(asistencias[i]);
          }
        } */
        console.log(asistencias);
        res.json(asistencias);
      }
    );
  },
};

module.exports = controller;
