const Blog = require("../models/blog");

const blog_index = (req, res) => {
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
};

const blog_details = (req, res) => {
  const id = req.params.id; //basically says what ever the id from the above line is, is what this line will be too
  console.log(id);
  Blog.findById(id) // to retrieve the document with this id
    //     .then((result) => {
    //       res.render("details", { blog: result, title: "blog details" });
    //     })
    //     .catch((err) => {
    //       res.status(404).render('404', {title: "Blog not found"})
    //     });
    .then((result) => {
      if (!result) {
        return res.status(404).render("404", { title: "Blog not found" });
      }
      res.render("details", { blog: result, title: "Blog Details" });
    });
};

const blog_delete = (req, res) => {
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
};

const blog_create = (req, res) => {
  res.render("create", { title: "create blog" });
};

const blog_showAll = (req, res) => {
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
};

module.exports = {
  blog_index,
  blog_details,
  blog_delete,
  blog_create,
  blog_showAll,
};
