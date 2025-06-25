import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import siginlogo from "./Images/siginlogo.png";
import "./index.css";

function Sigin() {
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to backend here using axios
     alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="lg">
      <form className="form2" onSubmit={handleSubmit}>
        <div className="head">User Registration</div>
        <section>
          <img className="siginlogo" src={siginlogo} alt="logo" />
        </section>
        <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} required />
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
