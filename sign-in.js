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
    console.log(req.body)
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
          if(results[0].userType == 1){
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

  app.get('/dashboard', function(request, res) {
    connection.query('SELECT u.legajo, a.`hora entrada` as entrada, a.`hora salida` as salida, concat(o.direccion," ", o.altura) as direccion, concat(u.nombre, " ", u.apellido) as nombre from asistencias as a join usuarios as u on a.idobrero=u.idUsuarios join obras as o on a.idobra=o.idObra', function(error, asistencias, fields){
      res.render('dashboard', {foo: asistencias});
  },
  )
  });

  app.get('/album', function (req, res) {
    connection.query('SELECT * FROM obras', function(error, arrayObras, fields){
      res.render('album', {foo: arrayObras});
  },
  )
  
  })

  app.post('/test', function (req, res) {
    let obra = req.body.obra;
    let fecha = req.body.fecha;
    let hora = req.body.hora
    let obrero = req.session.username
    console.log(req.body)
    connection.query('INSERT INTO asistencias VALUES (?, ?, ?, ?)', [obra, obrero, fecha, hora, hora], function(error, results, fields) {
      res.redirect('/album');
  })
})

app.listen(3000)
  