const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ToDo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log(e));

// Task Schema
const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  content: { type: String, required: true },
});
const Task = mongoose.model("Task", TaskSchema);

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Task Routes
app.post("/add", (req, res) => {
  const { task, content } = req.body;
  const newTask = new Task({ task, content });

  newTask
    .save()
    .then(() => res.json("Task saved"))
    .catch((e) => res.json(e));
});

app.get("/ToDo", (req, res) => {
  Task.find()
    .then((data) => res.json(data))
    .catch((e) => res.status(500).json({ error: "Failed to fetch tasks", details: e }));
});

app.delete("/delete/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task Deleted"))
    .catch((e) => res.json(e));
});

app.put("/update/:id", (req, res) => {
  const { task, content } = req.body;
  Task.findByIdAndUpdate(req.params.id, { task, content })
    .then(() => res.json("Task Updated"))
    .catch((e) => res.json(e));
});

// User Routes
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.json("User created"))
    .catch((e) => res.json(e));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({
            message: "Login successful",
            username: user.username,
            email: user.email,
          });
        } else {
          res.json({ message: "Invalid password" });
        }
      } else {
        res.json({ message: "User not found" });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: "Server error", error: e });
    });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
