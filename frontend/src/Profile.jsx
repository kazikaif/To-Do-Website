import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./index.css";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
     

    setUsername(localStorage.getItem("userName") || "");
    setEmail(localStorage.getItem("userEmail") || "");
    setPassword(localStorage.getItem("userPassword") || "");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const goToHome = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
       <div className="pro">
        <div className="pp">
          <section className="profile-title">👤 Profile</section>
          <div className="profile-inputs">
            <label>Username:</label>
            <input type="text" value={username} readOnly />

            <label>Email:</label>
            <input type="email" value={email} readOnly />

            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="password-field"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="profile-buttons">
            <button onClick={goToHome}>🏠 Home</button>
            <button onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
