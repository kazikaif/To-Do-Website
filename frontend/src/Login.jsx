import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import loginlogo from "./Images/Login.png";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
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
      .catch(() => alert("Something went wrong"));
  };

  return (
    <div className="lg">
      <form className="form" onSubmit={handleSubmit}>
        <img className="loginlogo" src={loginlogo} alt="Login Logo" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="linkf">
          <span style={{ color: "beige" }}>Forgot Password?</span>
        </div>
        <button className="l" type="submit">Login</button>
        <div className="sg">
          <section className="create">Create an Account -</section>
          <section className="si">
            <Link to="/signin">Sign in</Link>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Login;
