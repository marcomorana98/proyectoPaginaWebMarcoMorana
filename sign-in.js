const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
	host     : '190.173.68.7',
	user     : 'worker',
	password : '123',
	database : 'karpathia'
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
      connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          // Redirect to home page
          if(results[0].usertype == 1){
            res.redirect('/dashboard');
          }
          else{
            res.redirect('/album')
          }
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

  app.get('/dashboard', function(request, response) {
    response.sendFile(__dirname + '/dashboard.html')
  });

  app.get('/album', function (req, res) {
    connection.query('SELECT * FROM obras', function(error, arrayObras, fields){
      res.render('album', {foo: arrayObras});
  },
  )
})

app.listen(3000)
  