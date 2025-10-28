import React, { useState, useEffect } from "react";
import toast from "../../utils/toast";
import TicketForm from "./TicketForm";

export default function TicketManagement() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  // Save to localStorage
  const saveTickets = (newTickets) => {
    localStorage.setItem("tickets", JSON.stringify(newTickets));
    setTickets(newTickets);
  };

  // Create or update ticket
  const handleSave = (ticket) => {
    if (editingTicket) {
      const updatedTickets = tickets.map((t) =>
        t.id === editingTicket.id ? { ...ticket, id: editingTicket.id } : t
      );
      saveTickets(updatedTickets);
      toast("Ticket updated successfully!");
    } else {
      const newTicket = { ...ticket, id: Date.now() };
      saveTickets([...tickets, newTicket]);
      toast("Ticket created successfully!");
    }
    setEditingTicket(null);
    setShowForm(false);
  };

  // Delete a ticket
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((t) => t.id !== id);
      saveTickets(updatedTickets);
      toast("Ticket deleted.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎟 Ticket Management</h1>

      {!showForm && (
        <button
          style={styles.createBtn}
          onClick={() => {
            setEditingTicket(null);
            setShowForm(true);
          }}
        >
          + New Ticket
        </button>
      )}

      {showForm && (
        <TicketForm
          onSave={handleSave}
          onCancel={() => {
            setEditingTicket(null);
            setShowForm(false);
          }}
          existingTicket={editingTicket}
        />
      )}

      {/* Ticket List */}
      <div style={styles.ticketList}>
        {tickets.length === 0 ? (
          <p>No tickets available.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} style={styles.ticketCard}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <span style={{ ...styles.status, ...statusColor(ticket.status) }}>
                {ticket.status}
              </span>
              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => {
                    setEditingTicket(ticket);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(ticket.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Style helpers
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  createBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "block",
    margin: "0 auto 2rem",
  },
  ticketList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  ticketCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    position: "relative",
    color: "blue",
  },
  status: {
    position: "absolute",
    top: "15px",
    right: "15px",
    padding: "0.3rem 0.75rem",
    borderRadius: "12px",
    color: "white",
    textTransform: "capitalize",
    fontSize: "0.85rem",
  },
  actions: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  },
  editBtn: {
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

// Status color helper
const statusColor = (status) => {
  switch (status) {
    case "open":
      return { backgroundColor: "#28a745" };
    case "in_progress":
      return { backgroundColor: "#ffc107", color: "#333" };
    case "closed":
      return { backgroundColor: "#6c757d" };
    default:
      return { backgroundColor: "#adb5bd" };
  }
};