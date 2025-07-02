import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { API_BASE_URL } from "../../config/config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed 🙁");

    setSuccess("Registration was successful! You can log in now.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="register-container">
      <h2>Registration</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
<div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
  />
  <span className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

<div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleChange}
    required
  />
  <span className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>


        <button type="submit">Register</button>
      </form>
      <p style={{ fontSize: "0.9rem", color: "#aaa", textAlign: "center" }}>
        🕒 This app uses a free-tier backend that may take up to 1 minute to
        respond when idle.
      </p>
    </div>
  );
}

export default Register;
