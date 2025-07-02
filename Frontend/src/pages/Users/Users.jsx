import { useEffect, useState } from "react";
import "./Users.css";
import { API_BASE_URL } from "../../config/config";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  if (!editMode) return; // Prevent submission unless editing

  fetch(`${API_BASE_URL}/users/${editId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((updatedUser) => {
      setUsers(users.map((user) => (user._id === editId ? updatedUser : user)));
      setFormData({ name: "", email: "" });
      setEditMode(false);
      setEditId(null);
    })
    .catch((err) => console.error("Error updating user:", err));
};


  const handleEdit = (user) => {
    setEditMode(true);
    setEditId(user._id);
    setFormData({ name: user.name, email: user.email });
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowConfirm(true);
  };

const handleDeleteConfirmed = () => {
  fetch(`${API_BASE_URL}/users/${userToDelete}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(() => {
      setUsers(users.filter((user) => user._id !== userToDelete));
      setUserToDelete(null);
      setShowConfirm(false);
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      setShowConfirm(false);
    });
};


  return (
    <div className="users-container">
      <div className="users-header">
        {showConfirm && (
          <ConfirmModal
            onConfirm={handleDeleteConfirmed}
            onCancel={() => setShowConfirm(false)}
          />
        )}

        <h1>Users</h1>
        <p>
          This section is for admin use only. You can manage user accounts,
          including names and emails, and perform edits or deletions as needed.
        </p>
      </div>

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
<button type="submit" disabled={!editMode}>
  {editMode ? "Update User" : "Select a User to Edit"}
</button>
      </form>

      <div className="user-list">
        {Array.isArray(users) &&
          users.map((user) => (
            <div key={user._id} className="user-item">
              <strong>{user.name}</strong>
              <br />
              <span>{user.email}</span>
              <br />
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => confirmDelete(user._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Users;
