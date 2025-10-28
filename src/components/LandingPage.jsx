import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Login button clicked");
    navigate("/auth/login");
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>🎟 Ticket Manager Pro</h1>
          <p style={styles.subtitle}>
            Seamlessly create, track, and manage tickets across your team — fast, modern, and secure.
          </p>
          <div style={styles.buttons}>
            <Link to="/auth/login" style={styles.btnPrimary} >
              Login
            </Link>
            <Link style={styles.btnSecondary} to="/auth/signup">
              Get Started
            </Link>
          </div>
        </div>

        {/* Decorative Circle */}
        <div style={styles.circle}></div>

        {/* Wavy SVG background */}
        <svg
          viewBox="0 23 1440 320"
          style={{ position: "absolute", bottom: -30, left: 0, width: "100%", zIndex: 10 }}
        >
          <path
            fill="#ffffff"
            d="M0,160L80,186.7C160,213,320,267,480,277.3C640,288,800,256,960,245.3C1120,235,1280,245,1360,250.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featureBox}>
          <h3>🔐 Secure Login</h3>
          <p>Protected access with simulated authentication and session tokens.</p>
        </div>
        <div style={styles.featureBox}>
          <h3>📊 Smart Dashboard</h3>
          <p>Instantly view your open, closed, and total tickets in one glance.</p>
        </div>
        <div style={styles.featureBox}>
          <h3>⚙ Easy Management</h3>
          <p>Quickly create, edit, and resolve tickets with real-time feedback.</p>
        </div>
        <div style={styles.featureBox}>
          <h3>Convenience</h3>
          <p>Makes your life easier with streamlined ticket management.</p>
        </div>

      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        
      </footer>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    textAlign: "center",
    maxWidth: "1440px",
    margin: "0 auto",
    overflow: "hidden",
  },
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #007bff, #00b4d8)",
    color: "white",
    padding: "6rem 1rem 8rem",
    overflow: "hidden", 
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
    marginBottom: "60px",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "2rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    zIndex: 999,
  },
  btnPrimary: {
    backgroundColor: "white",
    color: "#007bff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  btnSecondary: {
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  circle: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "120px",
    height: "120px",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "50%",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    padding: "7rem 1rem",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  featureBox: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
 
};