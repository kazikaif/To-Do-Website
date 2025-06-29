const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Replace <password> and <dbname> with your actual credentials
mongoose
  .connect("mongodb+srv://Deny:Kazi@2004@cluster0.k6ilpqj.mongodb.net/ToDo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.error("MongoDB Connection Error:", e));

// ✅ Task Schema
const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  content: { type: String, required: true },
});
const Task = mongoose.model("Task", TaskSchema);

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// ✅ Create Task
app.post("/add", (req, res) => {
  const { task, content } = req.body;
  const newTask = new Task({ task, content });

  newTask
    .save()
    .then(() => res.json("Task saved"))
    .catch((e) => res.status(500).json({ error: "Failed to save task", details: e }));
});

// ✅ Get All Tasks
app.get("/ToDo", (req, res) => {
  Task.find()
    .then((data) => res.json(data))
    .catch((e) => res.status(500).json({ error: "Failed to fetch tasks", details: e }));
});

// ✅ Delete Task
app.delete("/delete/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task Deleted"))
    .catch((e) => res.status(500).json({ error: "Failed to delete task", details: e }));
});

// ✅ Update Task
app.put("/update/:id", (req, res) => {
  const { task, content } = req.body;
  Task.findByIdAndUpdate(req.params.id, { task, content })
    .then(() => res.json("Task Updated"))
    .catch((e) => res.status(500).json({ error: "Failed to update task", details: e }));
});

// ✅ Register User
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.json({ message: "User created" }))
    .catch((e) => res.status(500).json({ message: "Failed to register user", error: e }));
});

// ✅ Login User
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) return res.json({ message: "User not found" });

      if (user.password === password) {
        res.json({
          message: "Login successful",
          username: user.username,
          email: user.email,
        });
      } else {
        res.json({ message: "Invalid password" });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: "Server error", error: e });
    });
});

// ✅ Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
