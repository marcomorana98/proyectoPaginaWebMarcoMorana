var express = require('express');
var app = express();
const mysql = require('mysql2');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

const controller = {
    nuevoUsuario: function(request, res) {  
      res.render('newUser');
    },

    crearUsuario: function(req, res){
      let nombre = req.body.nombre;
      let apellido = req.body.apellido;
      let legajo = req.body.legajo;
      let id = x;
      connection.query('SELECT idUsuarios FROM usuarios', function(error, results, fields){
        if(results[(results.length)-1]<0 || results[(results.length)-1]==0){
          x=1
        }else{
          x=results[(results.length)-1] + 1;
        }
      })
      let username = nombre[0] + apellido;

      console.log(nombre + + apellido + +legajo + + id + + username);

      connection.query('INSERT INTO usuarios VALUES (?, ?, ?, ?, ?, ?, ?)', [id, username, legajo, 0, nombre, apellido, legajo], function(error, results, fields) {
        res.end();
      })
    },
}

module.exports = controller;