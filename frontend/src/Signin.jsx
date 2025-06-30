import "./index.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import siginlogo from "./Images/siginlogo.png";

function Signin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://to-do-website-bcwj.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User created") {
          alert("Registered Successfully");
          navigate("/login");
        } else {
          alert(data.message || "Something went wrong");
        }
      })
      .catch(() => alert("Registration failed"));
  };

  return (
    <div className="lg">
      <form className="form2" onSubmit={handleSubmit}>
        <div className="head">User Registration</div>
        <img className="siginlogo" src={siginlogo} alt="logo" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="l2">Sign Up</button>
        <div className="sg2">
          <section className="create">Already have an account?</section>
          <section className="si">
            <Link to="/login">Login</Link>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Signin;
