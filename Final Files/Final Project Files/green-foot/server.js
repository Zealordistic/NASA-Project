// this is server.js
const express = require('express');
const routes = require('./routes');
var bodyParser = require('body-parser');
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const app = express();
const port = 3000;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./frontend/build'));
app.use(express.json());

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
});

app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
  });

app.get('/results', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
  });

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
  });

app.get('/updatepw', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
  });

app.get('/updatemail', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
  });

  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
  });


app.use('/api', routes);
app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});
