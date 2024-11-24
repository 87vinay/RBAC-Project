import React, { useState , useEffect} from "react";
import AddUserModal from "./AddUserModal";
import ConfirmModal from "./ConfirmModal";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);
  const saveToLocalStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, { id: users.length + 1, ...newUser }];
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
  };
  const handleEditUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
  };
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId); 
    setIsConfirmOpen(true);
  };
  const confirmDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== userToDelete);
    setUsers(updatedUsers); 
    saveToLocalStorage(updatedUsers); 
    setUserToDelete(null); 
    setIsConfirmOpen(false); 
  };
  const cancelDelete = () => {
    setUserToDelete(null); 
    setIsConfirmOpen(false); 
  };
  const openAddModal = () => {
    setCurrentUser(null); 
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user); 
    setIsModalOpen(true);
  };

  return (
    <div className="users-container">
      <h2>Users Management</h2>
      <button className="add-user-btn" onClick={openAddModal}>
        Add User
      </button>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(user.id)}
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
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p className="role">Role: {user.role}</p>
              <span className={`status-badge ${user.status.toLowerCase()}`}>
                {user.status}
              </span>
            </div>
            <div className="card-actions">
              <button className="edit-btn"   onClick={() => openEditModal(user)}>Edit</button>
              <button className="delete-btn"  onClick={() => handleDeleteClick(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={currentUser ? handleEditUser : handleAddUser}
        initialData={currentUser}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default Users;
