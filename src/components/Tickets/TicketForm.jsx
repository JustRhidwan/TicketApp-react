import React, { useState, useEffect } from "react";
import toast from "../../utils/toast";

export default function TicketForm({ onSave, onCancel, existingTicket }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingTicket) setFormData(existingTicket);
  }, [existingTicket]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!["open", "in_progress", "closed"].includes(formData.status))
      newErrors.status = "Invalid status value.";
    if (formData.description && formData.description.length > 200)
      newErrors.description = "Description is too long (max 200 chars).";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast("Please fix the highlighted errors.");
      return;
    }

    onSave(formData);
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2>{existingTicket ? "Edit Ticket" : "New Ticket"}</h2>

      <div style={styles.field}>
        <label>Title</label>
        <input
          style={styles.input}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter ticket title"
        />
        {errors.title && <p style={styles.error}>{errors.title}</p>}
      </div>

      <div style={styles.field}>
        <label>Description</label>
        <textarea
          style={styles.textarea}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional description"
        />
        {errors.description && <p style={styles.error}>{errors.description}</p>}
      </div>

      <div style={styles.field}>
        <label>Status</label>
        <select
          style={styles.select}
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        {errors.status && <p style={styles.error}>{errors.status}</p>}
      </div>

      <div style={styles.actions}>
        <button type="submit" style={styles.saveBtn}>
          {existingTicket ? "Update" : "Create"}
        </button>
        <button
          type="button"
          style={styles.cancelBtn}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Inline styles
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
    boxSizing: 'border-box',
    maxWidth: "600px",
    margin: "0 auto",
  },
  field: {
    marginBottom: "1rem",
    
  },
  input: {
    width: '450px',
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginTop: "0.5rem",
    marginLeft: "0.5rem",
  },
  textarea: {
    width: '450px',
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginTop: "0.5rem",
    marginLeft: "2.1rem",
    minHeight: "80px",
  },
  select: {
     width: '470px',
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginTop: "0.5rem 1rem",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    marginTop: "1rem",
  },
  saveBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.3rem",
  },
};