import { useEffect, useState } from 'react';
import './Users.css';
import { API_BASE_URL } from "../../config/config";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ this makes it work
    },
  })
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.error("Error fetching users:", err));
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // UPDATE User
      fetch(`${API_BASE_URL}/users/${editId}`, {

        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      .then(res => res.json())
      .then(updatedUser => {
        setUsers(users.map(user => user._id === editId ? updatedUser : user));
        setFormData({ name: '', email: '' });
        setEditMode(false);
        setEditId(null);
      })
      .catch(err => console.error('Error updating user:', err));
    } else {
      // ADD New User
      fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      .then(res => res.json())
      .then(newUser => {
        setUsers([...users, newUser]);
        setFormData({ name: '', email: '' });
      })
      .catch(err => console.error('Error adding user:', err));
    }
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setUsers(users.filter(user => user._id !== id));
    })
    .catch(err => console.error('Error deleting user:', err));
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditId(user._id);
    setFormData({ name: user.name, email: user.email });
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      
      <form onSubmit={handleSubmit} className="user-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editMode ? 'Update User' : 'Add User'}</button>
      </form>

      <div className="user-list">
     {Array.isArray(users) &&
  users.map((user) => (
          <div key={user._id} className="user-item">
            <strong>{user.name}</strong><br />
            <span>{user.email}</span><br />
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
