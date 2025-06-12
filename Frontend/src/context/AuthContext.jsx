// - createContext to make the global context
// - useState to store the user
// - useEffect to load saved login data on app start
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(); // Create the actual context object that we’ll use throughout the app

export function AuthProvider({ children }) {
  // Create a provider component that wraps the app and gives access to the user state

  // user: stores the current logged-in user's info (name, email, role)
  // setUser: function to update the user
  const [user, setUser] = useState(null);

  // On component mount (only once), check if there's already a token + user saved
  useEffect(() => {
    // Get the token and user info from localStorage (from last login)
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    // If both exist, restore the user session
    if (token && userData) {
      setUser(JSON.parse(userData)); // Convert user string back to object
    }
  }, []); // Empty dependency array = run this only once when the app loads

  // Return a context provider that gives `user` and `setUser` to the whole app
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
