import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  
  return (
    <div>
      <h1></h1>
    </div>
  );
}
