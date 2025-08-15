const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema( //creates new instance of Schema
  {title: { type: String, required: true },
   snippet: { type: String, required: true },
   body:  { type: String, required: true },
},
  {timestamps: true, /*automatically generates timestamps for us*/}
);

const Blog = mongoose.model('Blog', blogSchema) //must be same name with the collection
module.exports = Blog; //exporting this so we can use elsewhere