import './App.css';
import NavBar from '../components/NavBar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import Companies from './pages/Companies/Companies';
import Applications from './pages/Applications/Applications';
import Login from './pages/Login/Login'; 


function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/login" element={<Login onLogin={(user) => console.log("Logged in:", user)} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
