import './Applications.css';

function Applications() {
  const sampleApplications = [
    {
      companyName: "Google",
      positionTitle: "Frontend Developer",
      status: "Applied",
      notes: "Submitted on Monday, follow up next week"
    },
    {
      companyName: "Amazon",
      positionTitle: "Backend Engineer",
      status: "Interviewing",
      notes: "Phone interview scheduled for Friday"
    },
    {
      companyName: "Netflix",
      positionTitle: "Full Stack Developer",
      status: "Offer",
      notes: "Received offer, considering"
    }
  ];

  return (
    <div className="applications-container">
      <h1>Applications</h1>
      <div className="application-list">
        {sampleApplications.map((app, index) => (
          <div key={index} className="application-item">
            <strong>{app.companyName}</strong><br />
            <span>{app.positionTitle}</span><br />
            <span className="status">{app.status}</span><br />
            <em>{app.notes}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;
