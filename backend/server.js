require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch((e) => console.error("❌ MongoDB Connection Error:", e));

// 🧱 SCHEMAS
const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  content: { type: String, required: true },
});
const Task = mongoose.model("Task", TaskSchema);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// 🧩 ROUTES

// ➕ Add Task
app.post("/add", async (req, res) => {
  try {
    const { task, content } = req.body;
    await new Task({ task, content }).save();
    res.json("Task saved");
  } catch (e) {
    res.status(400).json({ message: "Task save failed", error: e });
  }
});

// 📥 Get All Tasks
app.get("/ToDo", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch tasks", error: e });
  }
});

// ❌ Delete Task
app.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Task Deleted");
  } catch (e) {
    res.status(400).json({ message: "Delete failed", error: e });
  }
});

// ✏️ Update Task
app.put("/update/:id", async (req, res) => {
  try {
    const { task, content } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { task, content });
    res.json("Task Updated");
  } catch (e) {
    res.status(400).json({ message: "Update failed", error: e });
  }
});

// 🔐 Register User
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await new User({ username, email, password }).save();
    res.json({ message: "User created" });
  } catch (e) {
    res.status(400).json({ message: "Registration failed", error: e });
  }
});

// 🔑 Login User
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.json({ message: "User not found" });
    if (user.password !== password) return res.json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    res.status(500).json({ message: "Login failed", error: e });
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
