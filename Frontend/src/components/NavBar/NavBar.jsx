import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Job Tracker</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </div>

      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/applications" onClick={() => setIsOpen(false)}>
              Applications
            </Link>
          </li>
        )}

        {user && (
          <li>
            <Link to="/companies" onClick={() => setIsOpen(false)}>
              Companies
            </Link>
          </li>
        )}

        {user?.role === "admin" && (
          <li>
            <Link to="/users" onClick={() => setIsOpen(false)}>
              Users
            </Link>
          </li>
        )}

        {!user && (
          <>
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <button
              className="nav-logout-button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                setIsOpen(false);
                navigate("/");
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
