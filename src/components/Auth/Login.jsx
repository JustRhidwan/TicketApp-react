import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast("Please fill in all required fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const existingUser = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (!existingUser) {
      toast("Invalid credentials. Please try again.");
      return;
    }

    // Simulate login
    localStorage.setItem("ticketapp_session", JSON.stringify(existingUser));
    toast("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h1 className="text-gradient">Log in</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login</h2>

        <div style={styles.field}>
          <label>Email</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div style={styles.field}>
          <label>Password</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" style={styles.btn}>
          Login
        </button>

        <p style={styles.switchText}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/auth/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    width:"100vw",
    margin: "0 auto",
  },
  h2: {
    color:"#333",
  },
  form: {
    backgroundColor: "white",
    padding: "2rem 3rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%",
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    
  },
  field: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginTop: "0.5rem",
  },
  btn: {
    width: "100%",
    backgroundColor: "#007bff",
    color: "white",
    padding: "0.75rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  switchText: {
    textAlign: "center",
    marginTop: "1rem",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.3rem",
  },
};