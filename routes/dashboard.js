var express = require('express');
var app = express();
const mysql = require('mysql2');
var router = express.Router();
const path = require('path');

const dashboardController = require('../controllers/dashboardController');
const newUserController = require('../controllers/newUserController');
const nuevaObraController = require('../controllers/nuevaObraController');

router.get('/', dashboardController.mostrarDB);
router.get('/nuevo-usuario', newUserController.nuevoUsuario);
router.get('/nueva-obra', nuevaObraController.nuevaObra);

router.post('/nuevo-usuario', newUserController.crearUsuario);

module.exports = router;
