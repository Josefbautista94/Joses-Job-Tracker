import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/applications">Applications</Link> |
      <Link to="/users">Users</Link> | 
      <Link to="/companies">Companies</Link> 
    </nav>
  );
}

export default NavBar;