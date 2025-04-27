import { useEffect, useState } from 'react';
import './Applications.css';

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/applications')
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(err => console.error('Error fetching applications:', err));
  }, []);

  return (
    <div className="applications-container">
      <h1>Applications</h1>
      <table className="applications-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{app.companyName}</td>
              <td>{app.positionTitle}</td>
              <td>{app.status}</td>
              <td>{app.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;
