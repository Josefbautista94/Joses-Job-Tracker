import { useEffect, useState } from "react";
import "./Companies.css";
import { API_BASE_URL } from "../../config/config";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    website: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/companies`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editMode ? "PATCH" : "POST";
    const url = editMode
      ? `${API_BASE_URL}/companies/${editId}`
      : `${API_BASE_URL}/companies`;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (editMode) {
          setCompanies(
            companies.map((comp) => (comp._id === editId ? result : comp))
          );
          setEditMode(false);
          setEditId(null);
        } else {
          setCompanies([...companies, result]);
        }
        setFormData({ name: "", industry: "", location: "", website: "" });
      })
      .catch((err) => console.error("Error submitting company:", err));
  };


  const handleEdit = (comp) => {
    setEditMode(true);
    setEditId(comp._id);
    setFormData({
      name: comp.name,
      industry: comp.industry,
      location: comp.location,
      website: comp.website,
    });
  };

  const confirmDelete = (id) => {
    setCompanyToDelete(id);
    setShowConfirm(true);
  };

const handleDeleteConfirmed = () => {
  console.log("DELETE confirmed for:", companyToDelete);
  fetch(`${API_BASE_URL}/companies/${companyToDelete}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(() => {
      setCompanies(companies.filter((comp) => comp._id !== companyToDelete));
      setCompanyToDelete(null);
      setShowConfirm(false);
    })
    .catch((err) => {
      console.error("Error deleting company:", err);
      setShowConfirm(false);
    });
};


  return (
    <div className="companies-header">
      {showConfirm && (
  <ConfirmModal
    onConfirm={handleDeleteConfirmed}
    onCancel={() => setShowConfirm(false)}
  />
)}
      <h1>Companies</h1>
      <p>
        Use this page to manage your list of companies. You can store employer
        info like industry, location, and website — and use it to track who
        you’re applying to or want to reach out to.
      </p>

      <form onSubmit={handleSubmit} className="company-form">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />
        <button type="submit">
          {editMode ? "Update Company" : "Add Company"}
        </button>
      </form>

      <div className="company-list">
        {companies.map((company) => (
          <div key={company._id} className="company-item">
            <strong>{company.name}</strong>
            <br />
            <span>
              {company.industry} - {company.location}
            </span>
            <br />
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              {company.website}
            </a>
            <br />
            <button onClick={() => handleEdit(company)}>Edit</button>
            <button onClick={() => confirmDelete(company._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;
