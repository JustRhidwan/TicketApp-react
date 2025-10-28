// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "/src/components/utils/toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      toast("Your session has expired — please log in again.", "error");
      navigate("/auth/login");
    } else {
      const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
      console.log("loaded tickets:", savedTickets); // debug
      setTickets(savedTickets);
    }
  }, [navigate]);

  useEffect(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const in_progress = tickets.filter((t) => t.status === "in_progress").length;
    const closed = tickets.filter((t) => t.status === "closed").length;
    console.log("computed stats:", { total, open, in_progress, closed }); // debug
    setStats({ total, open, in_progress, closed });
  }, [tickets]);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    toast("Logged out successfully.", "info");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1
          className="text-gradient"
          style={{
            ...styles.title,
            "--gradient-start": "#007bff",
            "--gradient-end": "#00b4d8",
          }}
        >
          Dashboard
        </h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section style={styles.statsSection}>
        <div style={styles.statCard}>
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #28a745" }}>
          <h3>Open</h3>
          <p>{stats.open}</p>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #ffc107" }}>
          <h3>In Progress</h3>
          <p>{stats.in_progress}</p>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #6c757d" }}>
          <h3>Closed</h3>
          <p>{stats.closed}</p>
        </div>
      </section>

      <section style={styles.navLinks}>
        <Link to="/tickets" style={styles.btnPrimary}>
          Go to Ticket Management
        </Link>
      </section>

      <footer style={styles.footer}>
        <p>© 2025 TicketApp — Built for the Multi-Framework Challenge</p>
      </footer>
    </div>
  );
};

export default Dashboard;

const styles = {
  container: {
    maxWidth: "980px", // make explicit px
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    backgroundColor: "#f8f9fa" // light background so white cards are visible
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    color: "#007bff",
  },
  title: { margin: 0, fontSize: "1.75rem" },
  logoutBtn: {
    position: "absolute",
    right: 0,
    padding: "0.5rem 0.9rem",
    borderRadius: 6,
    background: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    width: "100%",
  },
  statCard: {
    background: "#fff",
    padding: "1.2rem",
    borderRadius: 10,
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
    border: "1px solid rgba(0,0,0,0.06)",
    minHeight: "84px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#007bff", // <-- ensure text inside is blue
  },
  navLinks: { width: "100%", textAlign: "center", marginTop: "1rem" },
  btnPrimary: {
    display: "inline-block",
    background: "#007bff",
    color: "#fff",
    padding: "0.7rem 1.2rem",
    borderRadius: 6,
    textDecoration: "none",
  },
  footer: { marginTop: "1.5rem", color: "#666", width: "100%", textAlign: "center" },
};
