import './Users.css';

function Users() {
  const sampleUsers = [
    { name: "Jose Bautista", email: "jose@example.com" },
    { name: "Ana Martinez", email: "ana@example.com" },
    { name: "Carlos Diaz", email: "carlos@example.com" }
  ];

  return (
    <div className="users-container">
      <h1>Users</h1>
      <div className="user-list">
        {sampleUsers.map((user, index) => (
          <div key={index} className="user-item">
            <strong>{user.name}</strong><br />
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
