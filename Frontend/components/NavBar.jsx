import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

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
        <li>
          <Link to="/applications" onClick={() => setIsOpen(false)}>
            Applications
          </Link>
        </li>
        <li>
          <Link to="/users" onClick={() => setIsOpen(false)}>
            Users
          </Link>
        </li>
        <li>
          <Link to="/companies" onClick={() => setIsOpen(false)}>
            Companies
          </Link>
        </li>

        <li>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
