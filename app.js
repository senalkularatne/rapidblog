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
mongoose.connect('mongodb://localhost/rapidblog');

// Serve custom style sheets
app.use(express.static("public"));

//******************************************************************
//                              Database
//******************************************************************

// Schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	dateCreated: {type: Date, default: Date.now}
	// Everything here, can have a default value, which is used if no data is given
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Surfing in Gold Coast, Australia",
// 	image: "https://i.dmarge.com/2015/10/viewfromabluemoon.jpg",
// 	body: "17 There is nothing more that I look forward to than a holiday to get me away from the hustle and bustle of the city.",
// 	// Leave dateCreated blank
// });

//******************************************************************
//                               ROUTES
//******************************************************************

// HOMEPAGE
app.get("/", function(req, res) {
	res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function(req, res) {

	// Retrieve all the blogs from DB and send it to index
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log("Error!");
		} else {
			res.render( "index", {blogs: blogs} );
		}
	});
});

//******************************************************************
//                          START SERVER
//******************************************************************

app.listen(3000, function() {
  console.log("RapidBlog Server is running");
});










