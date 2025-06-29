import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "./Header";
import linkedin from "./Images/linkedin.png";
import github from "./Images/github.png";
import vercel from "./Images/Vercel.png";
import insta from "./Images/insta.png";

function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      
      <section className="contact">Contact</section>

      <div className="cn">
        <div className="Contact" id="contact">
          <div className="about1 about2">
            <span className="ph">Phone:</span>
            <span className="no">7984-2929-07</span>
            <br />
            <span className="ph">Email:</span>
            <span className="no">denycoding2004@gmail.com</span>

            <div className="link">
              <a
                href="https://www.linkedin.com/in/kazi-mohammad-kaif-57b11423b/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="linkedin" src={linkedin} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/kazikaif"
                target="_blank"
                rel="noreferrer"
              >
                <img className="linkedin" src={github} alt="GitHub" />
              </a>
              <a
                href="https://vercel.com/kazi-mohammad-kaifs-projects"
                target="_blank"
                rel="noreferrer"
              >
                <img className="linkedin" src={vercel} alt="Vercel" />
              </a>
              <a
                href="https://www.instagram.com/_.kaifffff_29/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="linkedin" src={insta} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
