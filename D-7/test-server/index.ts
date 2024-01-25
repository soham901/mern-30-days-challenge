import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users: any[] = [];

app.get("/", (req, res) => {
  res.json({
    data: users,
    length: users.length,
  });
});

app.post("/contact-us", (req, res) => {
  if (!req.body.fullname || !req.body.email || !req.body.message) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  if (users.find((user) => user.email === req.body.email)) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  req.body.fullname = req.body.fullname.trim().toLowerCase();
  req.body.email = req.body.email.trim().toLowerCase();
  req.body.message = req.body.message.trim();

  users.push(req.body);

  console.log(users);

  res.json({
    message: "We received your message!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
