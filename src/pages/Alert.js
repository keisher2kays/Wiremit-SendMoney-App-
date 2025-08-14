import React from 'react';

const Alert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="custom-alert">
      <div className="alert-content">
        <p>{message}</p>
        <button onClick={onClose} className="alert-close-button">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;