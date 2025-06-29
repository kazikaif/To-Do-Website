import "./index.css";
import { useNavigate } from "react-router-dom";
import loginlogo from "./Images/Login.png";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

  fetch("https://to-do-website-brg2.onrender.com/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
})

      .then((res) => res.json())
      .then((result) => {
        if (result.message === "Login successful") {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userName", result.username);
          localStorage.setItem("userEmail", result.email);
          localStorage.setItem("userPassword", password);

          alert("Login Successfully");
          navigate("/");
        } else {
          alert(result.message);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="lg">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <img className="loginlogo" src={loginlogo} alt="Login Logo" />
        </div>
        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="linkf">
          <a href="#">Forgot Password?</a>
        </div>
        <button className="l" type="submit">Login</button>
        <div className="sg">
          <section className="create">Create an Account -</section>
          <section className="si">
            <a href="/singin">Sign in</a>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Login;
