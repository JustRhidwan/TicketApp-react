import React from "react";
import RouterIndex from "./components/router/index.js";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import TicketManagement from "./components/Tickets/TicketManagement";
import toast from "./utils/toast";

// ✅ Protected Route Wrapper
function ProtectedRoute({ children }) {
  const session = localStorage.getItem("ticketapp_session");
  if (!session) {
    toast("Your session has expired — please log in again.");
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <div style={styles.appContainer}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketManagement />
            </ProtectedRoute>
          }
        />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} TicketApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Inter', sans-serif",
    color: "#333",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  footer: {
    textAlign: "center",
    padding: "1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
    marginTop: "2rem",
  },
};