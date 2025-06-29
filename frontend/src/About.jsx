import { useState, useEffect } from "react";
import Header from "./Header";
import "./index.css";

function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      <div className="about" id="about">
        <section className="ab">About Me</section>
        <div className="about1">
          <section className="info">
            I'm a BSc-IT graduate from Parul University with a specialization in
            Full Stack Web Development. I’m passionate about building modern,
            responsive web applications and continuously expanding my skills.
            With knowledge of the MERN Stack, I strive to develop impactful
            digital solutions that are both user-friendly and efficient. I'm
            eager to contribute to real-world projects and grow as a software
            developer.
          </section>
        </div>
      </div>
    </>
  );
}

export default About;
