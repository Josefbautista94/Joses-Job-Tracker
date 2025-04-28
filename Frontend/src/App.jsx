import './App.css';
import NavBar from '../components/NavBar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import Companies from './pages/Companies/Companies';
import Applications from './pages/Applications/Applications';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
