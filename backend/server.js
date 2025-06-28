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

const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  content: { type: String, required: true },
});

const Task = mongoose.model("Task", TaskSchema);

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
    .catch((e) => {
      console.error("Error fetching tasks from MongoDB:", e);
      res.json({ error: "Failed to fetch tasks", details: e });
    });
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then(() => res.json("Task Deleted"))
    .catch((e) => res.json(e));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { task, content } = req.body;

  Task.findByIdAndUpdate(id, { task, content })
    .then(() => res.json("Task Updated"))
    .catch((e) => res.json(e));
});

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model("Users", Schema);

app.post("/register", (req, res) => {
const { username, email, password } = req.body;
const newUser = new Users({ username: username, email, password });


  newUser.save()
    .then(() => res.json("User created"))
    .catch((e) => res.json(e));
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findOne({ username: username })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Login successful" }); // ✅ Send object
        } else {
          res.json({ message: "Invalid password" }); // ✅ Send object
        }
      } else {
        res.json({ message: "User not found" }); // ✅ Handle non-existing user
      }
    })
    .catch((e) => {
      res.status(500).json({ message: "Server error", error: e });
    });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
