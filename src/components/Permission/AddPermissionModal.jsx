import React, { useState, useEffect } from "react";
import "./AddPermissionModal.css";

const AddPermissionModal = ({
  isOpen,
  onClose,
  onAddPermission,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    roles: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", roles: [] });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSelection = (e) => {
    const options = e.target.options;
    const selectedRoles = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedRoles.push(options[i].value);
      }
    }
    setFormData({ ...formData, roles: selectedRoles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPermission(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h3>{initialData ? "Edit Permission" : "Add Permission"}</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Permission Name"
            required
          />
          <label htmlFor="roles">Assign Roles</label>
          <select
            name="roles"
            id="roles"
            multiple
            value={formData.roles}
            onChange={handleRoleSelection}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <div className="modal-actions">
            <button type="submit">{initialData ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPermissionModal;
