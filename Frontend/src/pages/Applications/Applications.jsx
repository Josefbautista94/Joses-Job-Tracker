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
          {sampleApplications.map((app, index) => (
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
