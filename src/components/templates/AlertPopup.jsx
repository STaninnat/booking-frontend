import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AlertPopup.css";

function PopupSmall({ setShowPopupAlert }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!setShowPopupAlert) return null;

  return (
    <div className="popup-alert-overlay">
      <div
        className="popup-alert-bg"
        onClick={() => setShowPopupAlert(false)}
      />
      <div className="popup-alert">
        <p>Please sign in before making a reservation.</p>
        <div className="popup-alert-btn">
          <button className="signin-btn" onClick={() => navigate("/auth")}>
            Sign in
          </button>
          <button
            className="cancel-btn"
            onClick={() => setShowPopupAlert(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupSmall;
