import { useEffect, useState } from 'react';
import './Applications.css';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    positionTitle: '',
    status: 'Applied',
    notes: '',
    userId: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/applications')
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(err => console.error('Error fetching applications:', err));

    fetch('http://localhost:5001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editMode ? 'PATCH' : 'POST';
    const url = editMode ? `http://localhost:5001/applications/${editId}` : 'http://localhost:5001/applications';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then((result) => {
      if (editMode) {
        setApplications(applications.map(app => app._id === editId ? result : app));
        setEditMode(false);
        setEditId(null);
      } else {
        setApplications([...applications, result]);
      }
      setFormData({ companyName: '', positionTitle: '', status: 'Applied', notes: '', userId: '' });
    })
    .catch(err => console.error('Error submitting application:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/applications/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setApplications(applications.filter(app => app._id !== id));
    })
    .catch(err => console.error('Error deleting application:', err));
  };

  const handleEdit = (app) => {
    setEditMode(true);
    setEditId(app._id);
    setFormData({
      companyName: app.companyName,
      positionTitle: app.positionTitle,
      status: app.status,
      notes: app.notes,
      userId: app.userId
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
          name="notes" 
          placeholder="Notes" 
          value={formData.notes}
          onChange={handleChange}
        />
        <select name="userId" value={formData.userId} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <button type="submit">{editMode ? 'Update Application' : 'Add Application'}</button>
      </form>

      <table className="applications-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
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
              <td>{app.notes}</td>
              <td>
                <button onClick={() => handleEdit(app)}>Edit</button>
                <button onClick={() => handleDelete(app._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;
