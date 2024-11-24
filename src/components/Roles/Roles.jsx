import React, { useState, useEffect } from "react";
import AddRoleModal from "./AddRoleModal";
import ConfirmModal from "./ConfirmModal";
import "./Roles.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(storedRoles);
  }, []);

  const saveToLocalStorage = (updatedRoles) => {
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
  };

  const handleAddRole = (newRole) => {
    const updatedRoles = [...roles, { id: roles.length + 1, ...newRole }];
    setRoles(updatedRoles);
    saveToLocalStorage(updatedRoles);
  };

  const handleEditRole = (updatedRole) => {
    const updatedRoles = roles.map((role) =>
      role.id === updatedRole.id ? updatedRole : role
    );
    setRoles(updatedRoles);
    saveToLocalStorage(updatedRoles);
  };

  const handleDeleteClick = (roleId) => {
    setRoleToDelete(roleId); 
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    const updatedRoles = roles.filter((role) => role.id !== roleToDelete);
    setRoles(updatedRoles); 
    saveToLocalStorage(updatedRoles); 
    setRoleToDelete(null); 
    setIsConfirmOpen(false); 
  };

  const cancelDelete = () => {
    setRoleToDelete(null);
    setIsConfirmOpen(false); 
  };

  const openAddModal = () => {
    setCurrentRole(null);
    setIsModalOpen(true);
  };

  const openEditModal = (role) => {
    setCurrentRole(role); 
    setIsModalOpen(true);
  };

  return (
    <div className="roles-container">
      <h2>Roles Management</h2>
      <button className="add-role-btn" onClick={openAddModal}>
        Add Role
      </button>
      <div className="table-container">
        <table className="roles-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(role.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mobile-cards">
        {roles.map((role) => (
          <div key={role.id} className="role-card">
            <div className="role-info">
              <h3>{role.name}</h3>
              <p>{role.description}</p>
            </div>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => openEditModal(role)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(role.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddRole={currentRole ? handleEditRole : handleAddRole}
        initialData={currentRole}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this role?"
      />
    </div>
  );
};

export default Roles;
