import express from "express";
import cors from "cors";
import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017/30-days-mern");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Blog = mongoose.model("d8_blogs", blogSchema);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("DATA FETCHED");

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const sortBy = req.query.sortBy || "title";
  const sortOrder = req.query.sortOrder || "asc";

  // Define the aggregation pipeline
  const pipeline = [{ $skip: startIndex }, { $limit: limit }] as any;

  if (sortBy === "title") {
    pipeline.push({ $sort: { title: sortOrder === "asc" ? 1 : -1 } as any });
  } else if (sortBy === "timestamp") {
    pipeline.push({
      $sort: { timestamp: sortOrder === "asc" ? 1 : -1 } as any,
    });
  }

  // Execute the pipeline and retrieve the paginated and sorted data
  const data = await Blog.aggregate(pipeline);

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
