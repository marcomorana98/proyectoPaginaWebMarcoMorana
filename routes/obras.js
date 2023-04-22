var express = require("express");
var app = express();
const mysql = require("mysql2");
var router = express.Router();
const path = require("path");

const obrasController = require("../controllers/obrasController");

router.get("/", obrasController.mostrarObras);

router.post("/", obrasController.asistirAObra);

module.exports = router;
