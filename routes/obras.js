var express = require('express');
var app = express();
const mysql = require('mysql2');
var router = express.Router();
const path = require('path');


router.get('/', function (req, res) {
    connection.query('SELECT * FROM obras', function(error, arrayObras, fields){
      res.render('obras', {foo: arrayObras});
  },
  )
  
  });

router.post('/', function (req, res) {
    let obra = req.body.obra;
    let fecha = req.body.fecha;
    let hora = req.body.hora
    let obrero = req.session.username
    let nuevo = req.body.nuevo
    console.log(nuevo)
    connection.query('INSERT INTO asistencias VALUES (?, ?, ?, ?, ?)', [obra, obrero, fecha, hora, 0], function(error, results, fields) {
      res.redirect('/obras');
})
})
  

module.exports = router;