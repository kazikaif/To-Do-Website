import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import siginlogo from "./Images/siginlogo.png";
import "./index.css";

function Signin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/register", {
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
      .catch((err) => {
        console.error("Registration error:", err);
        alert("Registration failed");
      });
  };

  return (
    <div className="lg">
      <form className="form2" onSubmit={handleSubmit}>
        <div className="head">User Registration</div>
        <section>
          <img className="siginlogo" src={siginlogo} alt="logo" />
        </section>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
