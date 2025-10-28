// src/router/index.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page imports
import LandingPage from "../../components/LandingPage";
import Login from "../../components/Auth/Login";
import Signup from "../../components/Auth/Signup";
import Dashboard from "../Dashboard";
import TicketManagement from "../../components/Tickets/TicketManagement";

// ✅ Utility function for protected routes
function PrivateRoute({ children }) {
  const session = localStorage.getItem("ticketapp_session");
  return session ? children : <Navigate to="/auth/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <PrivateRoute>
              <TicketManagement />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}