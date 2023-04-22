const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const session = require("express-session");
const path = require("path");
const signinRouter = require("./routes/sign-in");
const albumRouter = require("./routes/obras");
const dashboardRouter = require("./routes/dashboard");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//Conexion a la DB
global.connection = mysql.createConnection({
  host: "190.173.94.235",
  user: "worker",
  password: "123",
  database: "karpathia",
});

//Crea la sesion
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", signinRouter);

app.use("/dashboard", dashboardRouter);

app.use("/obras", albumRouter);

app.listen(3000);
