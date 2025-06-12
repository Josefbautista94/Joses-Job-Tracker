import { useEffect, useState } from "react";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    positionTitle: "",
    status: "Applied",
    notes: "",
    website: "",
    userId: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5001/applications", {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ this is the key fix
    },
  })
    .then((res) => res.json())
    .then((data) => setApplications(data))
    .catch((err) => console.error("Error fetching applications:", err));

  fetch("http://localhost:5001/users", {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ same here
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
    const method = editMode ? "PATCH" : "POST";
    const url = editMode
      ? `http://localhost:5001/applications/${editId}`
      : "http://localhost:5001/applications";

    fetch(url, {
      method: method,
       headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (editMode) {
          setApplications(
            applications.map((app) => (app._id === editId ? result : app))
          );
          setEditMode(false);
          setEditId(null);
        } else {
          setApplications([...applications, result]);
        }
        setFormData({
          companyName: "",
          positionTitle: "",
          status: "Applied",
          notes: "",
          website: "",
          userId: "",
        });
      })
      .catch((err) => console.error("Error submitting application:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/applications/${id}`, {
      method: "DELETE",
       headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
    })
      .then(() => {
        setApplications(applications.filter((app) => app._id !== id));
      })
      .catch((err) => console.error("Error deleting application:", err));
  };

  const handleEdit = (app) => {
    setEditMode(true);
    setEditId(app._id);
    setFormData({
      companyName: app.companyName,
      positionTitle: app.positionTitle,
      status: app.status,
      notes: app.notes,
      userId: app.userId,
    });
  };

  return (
    <div className="applications-container">
      <h1>Applications</h1>

      <form onSubmit={handleSubmit} className="application-form">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="positionTitle"
          placeholder="Position Title"
          value={formData.positionTitle}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="text"
          name="website"
          placeholder="Company Website"
          value={formData.website}
          onChange={handleChange}
        />

        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <button type="submit">
          {editMode ? "Update Application" : "Add Application"}
        </button>
      </form>

      <table className="applications-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Website</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.companyName}</td>
              <td>{app.positionTitle}</td>
              <td>{app.status}</td>
              <td>
                {app.website ? (
                  <a
                    href={
                      app.website.startsWith("http")
                        ? app.website
                        : `https://${app.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {app.website}
                  </a>
                ) : (
                  <span style={{ color: "#888" }}>No Website</span>
                )}
              </td>
              <td>{app.notes}</td>
              <td>
                <button onClick={() => handleEdit(app)}>Edit</button>
                <button onClick={() => handleDelete(app._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/** Cards for Mobile */}
      <div className="applications-cards">
        {applications.map((app) => (
          <div key={app._id} className="application-card">
            <h3>{app.companyName}</h3>
            <p>
              <strong>Position:</strong> {app.positionTitle}
            </p>
            <p>
              <strong>Status:</strong> {app.status}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              {app.website ? (
                <a
                  href={
                    app.website.startsWith("http")
                      ? app.website
                      : `https://${app.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {app.website}
                </a>
              ) : (
                <span style={{ color: "#888" }}>No Website</span>
              )}
            </p>
            <p>
              <strong>Notes:</strong> {app.notes}
            </p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(app)}>Edit</button>
              <button onClick={() => handleDelete(app._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;