var express = require("express");
var app = express();

const controller = {
  obtenerDatos: function (req, res) {
    connection.query(
      'SELECT a.fecha u.legajo, a.`hora entrada` as entrada, a.`hora salida` as salida, concat(o.direccion," ", o.altura) as direccion, concat(u.nombre, " ", u.apellido) as nombre from asistencias as a join usuarios as u on a.idobrero=u.idUsuarios join obras as o on a.idobra=o.idObra',
      function (error, asistencias, fields) {
        console.log(req);
        let currentDay = req.params.fecha;
        console.log(currentDay);
        let delDia = [];
        for (let i = 0; asistencias.length > i; i++) {
          if (asistencias[i].fecha.toDateString() == currentDay) {
            delDia.push(asistencias[i]);
          }
        }
      }
    );
    const obj = JSON.parse(delDia);
    res.JSON(obj);
  },
};

module.exports = controller;
