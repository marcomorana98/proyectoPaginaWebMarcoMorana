var express = require("express");
var app = express();
const mysql = require("mysql2");
var router = express.Router();
const path = require("path");
app.set("views", path.join(__dirname, "views"));

const signinController = require("../controllers/signinController");

router.get("/", signinController.index);

router.post("/login", signinController.validar);

module.exports = router;
