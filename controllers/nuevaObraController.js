var express = require("express");
var app = express();
const mysql = require("mysql2");
const path = require("path");
app.set("views", path.join(__dirname, "views"));

const controller = {
  nuevaObra: function (request, res) {
    res.render("nuevaObra");
  },
};

module.exports = controller;
