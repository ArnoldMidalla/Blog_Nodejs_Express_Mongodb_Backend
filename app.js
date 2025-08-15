const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog"); //importing blog
require("dotenv").config();

//express app
const app = express();

//connect to mongodb
const port = process.env.Port || 4000;
const dbUrl = process.env.DATABASE_URL;

console.log(`Server running on port ${port}`);


mongoose
  .connect(dbUrl)
  .then((result) => app.listen(port)) //listening for requests
  .catch((err) => console.log(err));

//default view engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // add this. middleware so it is in a good sendable format
app.use(morgan("dev"));

//index page
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

// app.get("/blog", (req, res) => {
//   Blog.find()
//     .sort({ createdAt: -1 })
//     .then((result) => {
//       res.render("blog", { title: "All Blogs", blogs: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//to show all blogs
app.get("/blog", (req, res) => {
  //to add manually
  // const blog = new Blog({
  //   title: "Why women deserve less",
  //   snippet: "i said what i said",
  //   body: `why women deserve less`, });
  // blog
  //   .save() //to save
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => console.log(err));
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blog", { title: "All Blogs", blog: result });
    })
    .catch((err) => console.log(err));
});

//blog create page
app.get("/blog/create", (req, res) => {
  res.render("create", { title: "create blog" });
});

//save new blog
app.post("/blog", (req, res) => {
  // console.log(req.body)
  const blog = new Blog(req.body); //creating a new instance of blog
  blog
    .save()
    .then((result) => {
      res.redirect("/blog");
    }) //to redirect to home page when done
    .catch((err) => {
      console.log(err);
    });
});

//show single blog details
app.get("/blog/:id", (req, res) => {
  const id = req.params.id; //basically says what ever the id from the above line is, is what this line will be too
  console.log(id);
  Blog.findById(id) // to retrieve the document with this id
    .then((result) => {
      res.render("details", { blog: result, title: "blog details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//to delete single blog
app.delete("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    //after deleted, do this
    //it sends as json to the front end (details.ejs)
    .then((result) => {
      res.json({ redirect: "/blog" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});
