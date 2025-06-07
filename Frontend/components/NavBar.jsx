import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="nav-header">
        <div className="nav-logo"> Job Tracker </div>
<div className={`nav-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          {/*Hamburger Icon */}
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/applications" onClick={() => setIsOpen(false)}>
          Applications
        </Link>
        <Link to="/users" onClick={() => setIsOpen(false)}>
          Users
        </Link>
        <Link to="/companies" onClick={() => setIsOpen(false)}>
          Companies
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
