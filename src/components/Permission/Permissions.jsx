import React, { useState } from "react";
import AddPermissionModal from "./AddPermissionModal";
import ConfirmModal from "../ConfirmModal";
import "./Permissions.css";

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, name: "View Dashboard", roles: ["Admin", "Editor"] },
    { id: 2, name: "Manage Users", roles: ["Admin"] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(null);
  const [permissionToDelete, setPermissionToDelete] = useState(null);

  // Add or Edit Permission
  const handleAddPermission = (newPermission) => {
    if (currentPermission) {
      setPermissions(
        permissions.map((permission) =>
          permission.id === currentPermission.id ? newPermission : permission
        )
      );
    } else {
      setPermissions([
        ...permissions,
        { id: permissions.length + 1, ...newPermission },
      ]);
    }
    setIsModalOpen(false);
    setCurrentPermission(null);
  };

  const openAddModal = () => {
    setCurrentPermission(null);
    setIsModalOpen(true);
  };

  const openEditModal = (permission) => {
    setCurrentPermission(permission);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (permissionId) => {
    setPermissionToDelete(permissionId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    setPermissions(
      permissions.filter((permission) => permission.id !== permissionToDelete)
    );
    setIsConfirmOpen(false);
    setPermissionToDelete(null);
  };

  const cancelDelete = () => {
    setPermissionToDelete(null);
    setIsConfirmOpen(false);
  };

  return (
    <div className="permissions-container">
      <h2>Permissions Management</h2>
      <button className="add-permission-btn" onClick={openAddModal}>
        Add Permission
      </button>
      <div className="table-container">
        <table className="permissions-table">
          <thead>
            <tr>
              <th>Permission Name</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td>{permission.name}</td>
                <td>{permission.roles.join(", ")}</td>
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(permission)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(permission.id)}
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
        {permissions.map((permission) => (
          <div key={permission.id} className="permission-card">
            <h3>{permission.name}</h3>
            <p>Roles: {permission.roles.join(", ")}</p>
            <div className="card-actions">
              <button
                className="edit-btn"
                onClick={() => openEditModal(permission)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(permission.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddPermissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPermission={handleAddPermission}
        initialData={currentPermission}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this permission?"
      />
    </div>
  );
};

export default Permissions;
