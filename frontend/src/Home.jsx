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

  const baseURL = "https://to-do-website-brg2.onrender.com";

  const getTasks = () => {
    fetch(`${baseURL}/ToDo`)
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((e) => console.error("Error fetching tasks:", e));
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleTask = () => {
    if (isLoggedIn) {
      if (task && content) {
        if (isEditMode) {
          fetch(`${baseURL}/update/${editId}`, {
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
          fetch(`${baseURL}/add`, {
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
    } else {
      alert("Login First");
    }
  };

  const deleteTask = (id) => {
    fetch(`${baseURL}/delete/${id}`, {
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
    showInput();
  };

  const showInput = () => {
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
            onClick={showInput}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              width: "97.5vw",
              marginTop: "80px",
            }}
          >
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
