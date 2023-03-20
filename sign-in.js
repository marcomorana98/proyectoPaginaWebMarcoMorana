const express = require('express');
const bodyParser = require("body-parser")
const app = express()
var path = require('path')


app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/sign-in.html')
})
  
app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
  });


app.listen(3000)
  