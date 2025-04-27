import './Companies.css';

function Companies() {
  const sampleCompanies = [
    { name: "Google", industry: "Tech", location: "Mountain View", website: "https://google.com" },
    { name: "Amazon", industry: "E-commerce", location: "Seattle", website: "https://amazon.com" },
    { name: "Netflix", industry: "Entertainment", location: "Los Gatos", website: "https://netflix.com" }
  ];

  return (
    <div className="companies-container">
      <h1>Companies</h1>
      <div className="company-list">
        {sampleCompanies.map((company, index) => (
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
