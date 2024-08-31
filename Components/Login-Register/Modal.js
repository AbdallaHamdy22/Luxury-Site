import React from 'react';
import './Modal.css';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
