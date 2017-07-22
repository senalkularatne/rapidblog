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
app.use(express.static('public'));

// method override for PUT and DELETE
var methodOverride = require('method-override');
app.use(methodOverride("_method"));
// Here we pass in as an argument what to look for (Ex: _method). This can be anything.

// express-sanitizer used for sanitizing form inputs. This line needs to go after body-parser
var expressSanitizer = require('express-sanitizer');
app.use(expressSanitizer());




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

// INDEX Route
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

// NEW Route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

// CREATE Route
app.post("/blogs", function(req, res){
	// Sanitize
	req.body.blog.body = req.sanitize(req.body.blog.body);

	// a) Create blog 
	// Data sent back will have title, image & body inside blog object
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			// If there is error render new form again
			res,render("new")
		} else {
			// b) Redirect
			res.redirect("/blogs");
		}
	});
});

// SHOW Route
app.get("/blogs/:id", function(req, res){
	
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	})
});

// EDIT Route
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog:foundBlog});
		}
	});
});

// UPDATE Route
app.put("/blogs/:id", function(req, res){
	// Sanitize
	req.body.blog.body = req.sanitize(req.body.blog.body);

	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if (err) {
			res.redirect("/blogs"); // Redirect back to index
		} else{
			res.redirect("/blogs/ + req.params.id"); // Redirect to updated version
		}
	});
});


// DELETE Route
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/blogs"); 
		} else{
			res.redirect("/blogs"); 
		}
	});
});




//******************************************************************
//                          START SERVER
//******************************************************************

app.listen(3000, function() {
  console.log("RapidBlog Server is running");
});










