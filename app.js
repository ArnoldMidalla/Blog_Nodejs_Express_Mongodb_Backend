const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoutes = require('./routes/blogsRoutes')

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

app.use('/blog', blogRoutes) //the first parameter is optional. it means this only applies to those that have /blog. therefore, we can go to our blog routes code and remove the /blog/ leaving it as just / and it'll still work

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});
