import { useEffect, useState } from 'react';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="users-container">
      <h1>Users</h1>
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-item">
            <strong>{user.name}</strong><br />
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
