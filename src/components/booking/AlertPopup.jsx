import React from "react";

import "./AlertPopup.css";

function BookingAlertPopup({ message, onClose, buttonText }) {
  const buttonClass =
    buttonText === "Close"
      ? "success-green-btn"
      : buttonText === "Try Again"
      ? "fail-red-btn"
      : "";

  return (
    <div className="error-popup">
      <div className="popup-bg" onClick={onClose} />
      <div className="error-popup-content">
        <p>{message}</p>
        <button className={buttonClass} onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default BookingAlertPopup;
