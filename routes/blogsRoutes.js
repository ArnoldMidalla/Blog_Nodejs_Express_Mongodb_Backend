const express = require("express");
const router = express.Router();
const blogController = require('../controllers/blogController')

//to show all blogs
router.get("/", blogController.blog_showAll);

//blog create page
router.get("/create", blogController.blog_create);

//save new blog
router.post("/", blogController.blog_index);

//show single blog details
router.get("/:id", blogController.blog_details);

//to delete single blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;