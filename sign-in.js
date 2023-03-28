const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));


const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'MySQLPassword1.',
	database : 'login'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/sign-in.html')
})
  
app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          // Redirect to home page
          res.redirect('/home');
        } else {
          res.send('Incorrect Username and/or Password!');
        }			
        res.end();
      });
    } else {
      res.send('Please enter Username and Password!');
      res.end();
    }
  });

  app.get('/home', function(request, response) {
    // If the user is loggedin
    if (request.session.loggedin) {
      // Output username
      response.send('Welcome back, ' + request.session.username + '!');
    } else {
      // Not logged in
      response.send('Please login to view this page!');
    }
    response.end();
  });


app.listen(3000)
  