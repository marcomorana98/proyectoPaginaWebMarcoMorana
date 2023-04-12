var express = require('express');
var app = express();
const mysql = require('mysql2');
var router = express.Router();
const path = require('path');

const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.mostrarDB);

  module.exports = router;
