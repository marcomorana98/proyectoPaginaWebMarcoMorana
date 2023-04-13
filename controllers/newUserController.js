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
      let username = nombre[0] + apellido;
      let id;

      console.log(nombre + " " + apellido + " " + legajo + " " + username);

      connection.query('INSERT INTO usuarios VALUES (?, ?, ?, ?, ?, ?, ?)', [id, username, legajo, 0, nombre, apellido, legajo], function(error, results, fields) {
        res.redirect('/dashboard/nuevo-usuario');
      })
    },
}

module.exports = controller;