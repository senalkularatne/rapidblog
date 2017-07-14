//******************************************************************
//                              SETUP
//******************************************************************

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Setup mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gounigo');

//******************************************************************
//                              Database
//******************************************************************



//******************************************************************
//                               ROUTES
//******************************************************************




//******************************************************************
//                          START SERVER
//******************************************************************

app.listen(3000, function() {
  console.log("GoUniGo Server is running");
});










