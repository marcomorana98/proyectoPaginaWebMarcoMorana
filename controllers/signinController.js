var express = require("express");
var app = express();
const mysql = require("mysql2");
const path = require("path");
app.set("views", path.join(__dirname, "views"));

const controller = {
  index: async (req, res) => {
    res.render("sign-in");
  },

  validar: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);
    if (username && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query(
        "SELECT * FROM usuarios WHERE username = ? AND password = ?",
        [username, password],
        function (error, results, fields) {
          // If there is an issue with the query, output the error
          if (error) throw error;
          // If the account exists
          if (results.length > 0) {
            // Authenticate the user
            req.session.loggedin = true;
            req.session.username = username;
            req.session.save();
            // Redirect to home page
            if (results[0].userType == 1) {
              res.redirect("/dashboard");
            } else {
              res.redirect("/obras");
            }
          } else {
            res.send("Incorrect Username and/or Password!");
          }
          res.end();
        }
      );
    } else {
      res.send("Please enter Username and Password!");
      res.end();
    }
  },
};

module.exports = controller;
