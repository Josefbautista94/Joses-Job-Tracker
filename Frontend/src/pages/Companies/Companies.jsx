import { useEffect, useState } from 'react';
import './Companies.css';

function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/companies')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  return (
    <div className="companies-container">
      <h1>Companies</h1>
      <div className="company-list">
        {companies.map((company, index) => (
          <div key={index} className="company-item">
            <strong>{company.name}</strong><br />
            <span>{company.industry} - {company.location}</span><br />
            <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;
