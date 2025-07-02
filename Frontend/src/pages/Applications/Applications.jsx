import { useEffect, useState } from "react";
import "./Applications.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/config";

function Applications() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
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
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error fetching applications:", err));

    // ✅ Set userId for logged-in user if not admin
    if (user?.role !== "admin") {
      setFormData((prev) => ({ ...prev, userId: user?._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editMode ? "PATCH" : "POST";
    const url = editMode
      ? `${API_BASE_URL}/applications/${editId}`
      : `${API_BASE_URL}/applications`;

    // ✅ Inject userId for non-admins just before sending
    const submissionData = {
      ...formData,
      userId: user?.role === "admin" ? formData.userId : user?._id,
    };
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(submissionData),
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
          userId: user?.role === "admin" ? "" : user?._id, // Reset properly
        });
      })
      .catch((err) => console.error("Error submitting application:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/applications/${id}`, {
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

  const filteredApplications =
    user?.role === "admin" && selectedUserId
      ? applications.filter((app) => app.userId._id === selectedUserId)
      : applications;

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

    <textarea
  name="notes"
  placeholder="Notes"
  value={formData.notes}
  onChange={handleChange}
  className="application-notes"
/>


        {user?.role === "admin" && (
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ padding: "8px", margin: "10px 0" }}
          >
            <option value="">All Users</option>
            {[
              ...new Map(
                applications.map((app) => [app.userId._id, app.userId])
              ).values(),
            ].map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        )}

        <button type="submit">
          {editMode ? "Update Application" : "Add Application"}
        </button>
      </form>

      <table className="applications-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Date</th>
            <th>Status</th>
            <th>Website</th>
            <th>Notes</th>
            {user?.role === "admin" && <th>User</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app._id}>
              <td>{app.companyName}</td>
              <td>{app.positionTitle}</td>
              <td>{new Date(app.dateApplied).toLocaleDateString()}</td>
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
              {user?.role === "admin" && (
                <td>
                  {app.userId?.name}
                  <br />
                  <small>{app.userId?.email}</small>
                </td>
              )}

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
        {filteredApplications.map((app) => (
          <div key={app._id} className="application-card">
            <h3>{app.companyName}</h3>
            <p>
              <strong>Position:</strong> {app.positionTitle}
            </p>
            <p>
              <strong>Date Applied:</strong>{" "}
              {new Date(app.dateApplied).toLocaleDateString()}
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
