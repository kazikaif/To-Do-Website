import { NavLink } from "react-router-dom";
import profile from "./Images/profile.png";
import "./index.css";

function Header({ isLoggedIn }) {
  return (
    <header>
      <div className="title">
        <section>To-Do</section>
      </div>
      <div className="nav">
        <nav className="navbar">
         <NavLink
  to="/"
  end
  className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
>
  Home
</NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Contact
          </NavLink>
        </nav>
        {isLoggedIn ? (
          <NavLink to="/profile">
            <img className="img" src={profile} alt="Profile" />
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
