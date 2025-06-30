require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("MongoDB Connection Error:", e));

// Task Schema
const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
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

// Add Task
app.post("/add", (req, res) => {
const { task, content, userId } = req.body;
const newTask = new Task({ userId, task, content });


  newTask
    .save()
    .then(() => res.json({ message: "Task saved" }))
    .catch((e) =>
      res.status(500).json({ error: "Failed to save task", details: e })
    );
});

// Get All Tasks
app.get("/ToDo", (req, res) => {
const { userId } = req.query;
Task.find({ userId })
    .then((data) => res.json(data))
    .catch((e) =>
      res.status(500).json({ error: "Failed to fetch tasks", details: e })
    );
});

// Delete Task
app.delete("/delete/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Task deleted" }))
    .catch((e) =>
      res.status(500).json({ error: "Failed to delete task", details: e })
    );
});

// Update Task
app.put("/update/:id", (req, res) => {
  const { task, content } = req.body;
  Task.findByIdAndUpdate(req.params.id, { task, content })
    .then(() => res.json({ message: "Task updated" }))
    .catch((e) =>
      res.status(500).json({ error: "Failed to update task", details: e })
    );
});

// Register User
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.json({ message: "User created" }))
    .catch((e) =>
      res.status(500).json({ error: "Registration failed", details: e })
    );
});

// Login User
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
  _id: user._id, // good
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
