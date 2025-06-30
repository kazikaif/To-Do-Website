import { useState, useEffect } from "react";
import Header from "./Header";
import "./index.css";
import del from "./Images/del.png";
import edit from "./Images/edit.png";

function Home() {
  const [task, setTask] = useState("");
  const [content, setContent] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const baseURL = "https://to-do-website-bcwj.onrender.com"; 

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const fetchTasks = () => {
    fetch(`${baseURL}/ToDo`)
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((e) => console.error("Error fetching tasks:", e));
  };

  const handleTask = () => {
    if (!isLoggedIn) return alert("Login First");

    if (!task && !content) return alert("Write Something...");
    if (!task) return alert("Please Write Task");
    if (!content) return alert("Please Write Content");

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `${baseURL}/update/${editId}` : `${baseURL}/add`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, content }),
    })
      .then(() => {
        setTask("");
        setContent("");
        setIsEditMode(false);
        setEditId(null);
        fetchTasks();
      })
      .catch((e) => console.error("Error saving task:", e));
  };

  const deleteTask = (id) => {
    fetch(`${baseURL}/delete/${id}`, { method: "DELETE" })
      .then(() => fetchTasks())
      .catch((e) => console.error("Error deleting task:", e));
  };

  const editTask = (item) => {
    setTask(item.task);
    setContent(item.content);
    setIsEditMode(true);
    setEditId(item._id);
    document.getElementById("textarea").style.display = "block";
    document.getElementById("btn2").style.display = "block";
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <div className="imp">
          <input
            className="inp1"
            type="text"
            placeholder="Task..."
            value={task}
            onClick={() => {
              document.getElementById("textarea").style.display = "block";
              document.getElementById("btn2").style.display = "block";
            }}
            onChange={(e) => setTask(e.target.value)}
          />
          <textarea
            className="inp2"
            id="textarea"
            placeholder="Write your task here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn2" id="btn2" onClick={handleTask}>
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </main>

      <div className="view">
        {isLoggedIn ? (
          taskList.length > 0 ? (
            taskList.map((item, i) => (
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
            ))
          ) : (
            <h2>No Tasks Found</h2>
          )
        ) : (
          <div className="login-warning">
            <h2 style={{ fontSize: "35px", color: "red", textAlign: "center" }}>
              Please login first
            </h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;