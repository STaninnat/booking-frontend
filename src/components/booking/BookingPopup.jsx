import React from "react";
import "./BookingPopup.css";

function BookingPopup({ onClose, children }) {
  return (
    <div className="booking-popup-overlay">
      <div className="popup-bg" onClick={onClose} />
      <div className="booking-popup-content">
        <i className="ri-close-circle-fill close-icon" onClick={onClose}></i>
        {children}
      </div>
    </div>
  );
}

export default BookingPopup;
