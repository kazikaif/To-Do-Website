import { Link } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import del from "./Images/del.png";
import edit from "./Images/edit.png";

function Home() {
  const [task, setTask] = useState("");
  const [content, setContent] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const getTasks = () => {
    fetch("http://localhost:5000/ToDo")
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((e) => console.error("Error fetching tasks:", e));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const bal = () => {
    if (task && content) {
      if (isEditMode) {
        fetch(`http://localhost:5000/update/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task, content }),
        })
          .then(() => {
            setTask("");
            setContent("");
            setIsEditMode(false);
            setEditId(null);
            getTasks();
          })
          .catch((e) => console.log("Update error:", e));
      } else {
        fetch("http://localhost:5000/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task, content }),
        }).then(() => {
          setTask("");
          setContent("");
          getTasks();
        });
      }
    } else {
      if (!task && !content) alert("Write Something...");
      else if (!task) alert("Please Write Task");
      else if (!content) alert("Please Write Content");
    }
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => getTasks())
      .catch((e) => console.log(e));
  };

  const editTask = (item) => {
    setTask(item.task);
    setContent(item.content);
    setIsEditMode(true);
    setEditId(item._id || item.id);
    show();
  };

  const show = () => {
    document.getElementById("textarea").style.display = "block";
    document.getElementById("btn2").style.display = "block";
  };

  return (
    <div>
      <header>
        <div className="title">
          <section>To-Do</section>
        </div>
        <div className="nav">
          <nav className="nv">Home</nav>
          <nav className="nv">About</nav>
          <nav className="nv">Contact</nav>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
      </header>

      <main>
        <div className="imp">
          <input
            className="inp1"
            type="text"
            placeholder="Task..."
            onClick={show}
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <textarea
            className="inp2"
            id="textarea"
            placeholder="Write your task here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button className="btn2" id="btn2" onClick={bal}>
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </main>

      <div className="view">
        {taskList.map((item, i) => (
          <div className="dats" key={item._id}>
            <div className="top-row">
              <section className="task-index">{i + 1}</section>
              <div className="action-buttons">
                <button onClick={() => editTask(item)}>
                  <img src={edit} alt="Edit" />
                </button>
                <button className="bt" onClick={() => deleteTask(item._id)}>
                  <img className="size" src={del} alt="Delete" />
                </button>
              </div>
            </div>
            <section className="task-title">{item.task}</section>
            <section className="task-content">
              {item.content.length > 212
                ? item.content.slice(0, 212) + "..."
                : item.content}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
