import { useState } from "react";
import { useContext } from "react"; // React hook to access shared data (like user) from a context — in this case, AuthContext
import { AuthContext } from "../../context/AuthContext"; // importing the context where user data is stored globally. This is how you update login state app-wide.
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" }); // This holds the values from the login form. Starts empty and updates when the user types
  const [error, setError] = useState(""); // Stores any error messages to show the user if login fails.
  const { setUser } = useContext(AuthContext); // Accesses the setUser() function from global state so you can set the current logged-in user after a successful login
  const navigate = useNavigate(); //Lets you send the user to another page after login (in this case, /applications).
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    // Updates the formData state each time the user types into the email or password field. It uses the name attribute to know which field is being changed.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // SUBMIT LOGIN FORM
    e.preventDefault(); //  Stops the page from refreshing on form submit.
    setError(""); // Clears any previous error messages.

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        // Sends a POST request to the backend’s /auth/login endpoint with the form data (email & password) in JSON format.
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); //Parses the response into a usable JavaScript object.

      if (!res.ok) {
        // If the response isn’t OK (e.g., 401 unauthorized), show the error message returned by the server or a fallback message.
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token); //Saves the JWT token to localStorage so it can be used for future requests.
      localStorage.setItem("user", JSON.stringify(data.user)); // Saves the user info (like name, email, role) so it can be loaded later when the app starts.

      setUser(data.user); // Updates the global login state (AuthContext) so the rest of the app knows a user is now logged in.

      navigate("/applications"); // Redirects the user to the /applications page right after a successful login.
  
    } catch (err) {
      setError(err.message); //If anything fails during the login process (like bad password, no response), this displays the error to the user.
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {/*  Show error message only if there is one (e.g., invalid credentials) */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Login form — when submitted, triggers handleSubmit() */}
      <form onSubmit={handleSubmit}>
        {/* Email input field */}
        <input
          type="email" // Input type: email
          name="email" // Name used in formData state
          placeholder="Email" // Placeholder text inside input
          value={formData.email} // Controlled input: value comes from state
          onChange={handleChange} // When user types, update state
          required // Field must be filled out to submit
        />

        {/* Passowrd input field */}
       <input
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  required
/>
<div className="show-password-toggle">
  <input
    type="checkbox"
    id="showLoginPassword"
    checked={showPassword}
    onChange={() => setShowPassword(!showPassword)}
  />
  <label htmlFor="showLoginPassword">Show Password</label>
</div>
        {/* Submit button — triggers form submit */}
        <button type="submit">Login</button>
      </form>
   <p style={{ fontSize: "0.9rem", color: "#aaa", textAlign: "center", marginTop: "1rem" }}>
  🕒 Server may take up to 1 minute to respond due to free-tier hosting (cold start).
</p>

    </div>
  );
}

export default Login;
