import { useEffect, useState } from "react";
import "./Applications.css";
import { useContext } from "react";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/config";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import NotesModal from "../../components/NotesModal/NotesModal";

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
  const [activeNoteHtml, setActiveNoteHtml] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const formRef = useRef(null);


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

  const confirmDelete = (id) => {
    setAppToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = () => {
    console.log("DELETE confirmed for:", appToDelete);
    fetch(`${API_BASE_URL}/applications/${appToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setApplications(applications.filter((app) => app._id !== appToDelete));
        setAppToDelete(null);
        setShowConfirm(false);
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
    website: app.website,
    userId: app.userId,
  });

  // Scroll to form
  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100); // slight delay ensures layout is ready
};

  const filteredApplications =
    user?.role === "admin" && selectedUserId
      ? applications.filter((app) => app.userId._id === selectedUserId)
      : applications;

  return (
    <div className="applications-container">
      {activeNoteHtml && (
        <NotesModal
          htmlContent={activeNoteHtml}
          onClose={() => setActiveNoteHtml(null)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <h1>Applications</h1>

<form ref={formRef} onSubmit={handleSubmit} className="application-form">
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
<div className="editor-wrapper">
<div
  contentEditable
  className="clean-notes-editor"
  onInput={(e) =>
    setFormData({ ...formData, notes: e.currentTarget.innerHTML })
  }
  dangerouslySetInnerHTML={{ __html: formData.notes }}
></div>

</div>

        {user?.role === "admin" && (
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ padding: "8px", margin: "10px 0" }}
          >
            <option value="">All Users</option>
            {[
              ...new Map(
                applications
                  .filter((app) => app.userId) // ✅ only include apps with user info
                  .map((app) => [app.userId._id, app.userId])
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
              <td className="app-company">{app.companyName}</td>
              <td className="app-position">{app.positionTitle}</td>
              <td className="app-date">
                {app.dateApplied
                  ? new Date(app.dateApplied).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <span className={`status-tag ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </td>
              <td className="app-website">
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
              <td className="app-notes">
                <div className="notes-wrapper">
                  <button
                    className="view-notes-btn"
                    onClick={() => setActiveNoteHtml(app.notes)}
                  >
                    View
                  </button>
                  <div
                    className="notes-preview"
                    dangerouslySetInnerHTML={{ __html: app.notes }}
                  />
                </div>
              </td>

              {user?.role === "admin" && (
                <td>
                  {app.userId?.name}
                  <br />
                  <small>{app.userId?.email}</small>
                </td>
              )}
              <td>
                <button onClick={() => handleEdit(app)}>Edit</button>
                <button onClick={() => confirmDelete(app._id)}>Delete</button>
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
  {app.website.length > 40 ? app.website.slice(0, 40) + "..." : app.website}
</a>

              ) : (
                <span style={{ color: "#888" }}>No Website</span>
              )}
            </p>
<div className="application-card-section">
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <strong>Notes:</strong>
    <button
      className="view-notes-btn"
      onClick={() => setActiveNoteHtml(app.notes)}
    >
      View
    </button>
  </div>
  <div
    className="application-card-notes"
    dangerouslySetInnerHTML={{ __html: app.notes }}
  />
</div>


            <div className="card-buttons">
              <button onClick={() => handleEdit(app)}>Edit</button>
              <button onClick={() => confirmDelete(app._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;
