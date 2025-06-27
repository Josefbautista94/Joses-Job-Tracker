import "./Home.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="hero-title">Welcome to Job Tracker</h1>
        <p className="hero-subtitle">
          Keep tabs on your job applications, company prospects, and career progress — all in one place.
        </p>

      {!user && (
  <div className="cta-wrapper">
    <p className="cta-message">
      Start tracking your job search today.
    </p>
    <a href="/register" className="cta-button">Sign Up for Free</a>
  </div>
)}

      </div>
    </div>
  );
}

export default Home;