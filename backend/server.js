// --- Backend: server.js ---
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
  task: String,
  content: String,
});

const Task = mongoose.model("task", TaskSchema);

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
    .catch((e) => res.json(e));
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
