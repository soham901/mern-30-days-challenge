import express from "express";
import cors from "cors";
import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017/30-days-mern");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("d8_blogs", blogSchema);

// append id before title on all the blogs
// const _blogs = await Blog.find();
// _blogs.forEach(async (blog) => {
//   await Blog.updateOne(
//     { _id: blog._id },
//     { $set: { title: blog.id + ". " + blog.title } }
//   );
// });

// remove id field from all the blogs
// const _blogs = await Blog.find();
// _blogs.forEach(async (blog) => {
//   await Blog.updateOne({ _id: blog._id }, { $unset: { id: "" } });
// });

const app = express();

app.use(cors());
app.use(express.json());

let blogs: {
  title: String;
  content: String;
}[] = [];

let start = 10;

app.get("/", async (req, res) => {
  console.log("DATA FETCHED");

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  let data = await Blog.find().skip(startIndex).limit(limit);
  let length = data.length || 0;
  let currentPage = page;
  let count = await Blog.countDocuments();

  let totalPages = Math.ceil(count / limit) | 0;

  res.json({
    data,
    length,
    currentPage,
    totalPages,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
