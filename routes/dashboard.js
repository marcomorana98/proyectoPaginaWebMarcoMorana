var express = require('express');
var app = express();
const mysql = require('mysql2');
var router = express.Router();
const path = require('path');


router.get('/', function(request, res) {
    connection.query('SELECT u.legajo, a.`hora entrada` as entrada, a.`hora salida` as salida, concat(o.direccion," ", o.altura) as direccion, concat(u.nombre, " ", u.apellido) as nombre from asistencias as a join usuarios as u on a.idobrero=u.idUsuarios join obras as o on a.idobra=o.idObra', function(error, asistencias, fields){
      res.render('dashboard', {foo: asistencias});
  },
  )
  });

  module.exports = router;
