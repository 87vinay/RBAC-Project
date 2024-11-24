import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Confirm</h2>
          <p>{message}</p>
          <div className="modal-actions">
            <button onClick={onConfirm} className="confirm-btn">
              Confirm
            </button>
            <button onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmModal;
