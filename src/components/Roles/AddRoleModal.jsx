import React, { useState, useEffect } from "react";
import "./AddRoleModal.css";

const AddRoleModal = ({ isOpen, onClose, onAddRole, initialData }) => {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setRoleName(initialData.name);
      setRoleDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRole = {
      id: initialData ? initialData.id : Date.now(), // Use the existing id if editing
      name: roleName,
      description: roleDescription,
    };

    onAddRole(newRole);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setRoleName("");
    setRoleDescription("");
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{initialData ? "Edit Role" : "Add New Role"}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddRoleModal;
