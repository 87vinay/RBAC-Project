import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal">
      <div className="confirm-modal-content">
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
