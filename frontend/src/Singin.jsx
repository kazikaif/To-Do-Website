import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import siginlogo from "./Images/siginlogo.png";
import "./index.css";

function Sigin() {
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
      .then(() => {
        alert("Registered Successfully");
        navigate("/login");
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
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="l2">Sign-In</button>
        <div className="sg2">
          <section className="create">Already Created -</section>
          <section className="si">
            <Link to="/login">Login</Link>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Sigin;
