import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "/src/services/AuthService";
import { ToastContainer } from "/src/utils/toast";
import "./Layout.css"; // or "../styles/Layout.css"

export default function Layout({ children }) {
  const session = AuthService.getSession();
  const navigate = useNavigate();

  function handleLogout() {
    AuthService.logout();
    navigate("/");
  }

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container">
          <div className="brand">
            <Link to="/">TicketApp</Link>
          </div>
          <nav className="main-nav" aria-label="Main navigation">
            <Link to="/">Home</Link>
            {session ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tickets">Tickets</Link>
                <button className="btn-ghost" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/signup">Get Started</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <small>© {new Date().getFullYear()} TicketApp — Accessible & Responsive</small>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}
