import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupNormal from "../templates/PopupNormal";
import { Helmet } from "react-helmet";
import "./AppAuth.css";

function AppAuth() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const navigate = useNavigate();

  const handleShowPopup = (type) => {
    setPopupContent(type);
    setShowPopup(true);

    if (type === "signup") {
      navigate("/auth?tab=signup");
    } else if (type === "signin") {
      navigate("/auth?tab=signin");
    }
  };

  return (
    <div className="app-auth">
      <Helmet>
        <title>
          {popupContent === "signup"
            ? "Create an Account - Hotel Motel"
            : popupContent === "signin"
            ? "Sign In - Hotel Motel"
            : "Discover Your Next Stay - Hotel Motel"}
        </title>
      </Helmet>
      <div className="app-auth-section">
        <div className="app-auth-left">
          <img
            className="app-auth-logo"
            src="/images/logo_header.png"
            alt="auth-logo"
          />
        </div>

        <div className="app-auth-right">
          <div className="app-auth-right-container">
            <h1>Discover Your Next Stay</h1>
            <h3>Be part of it today!</h3>
            <button
              id="app-auth-right-signup-btn"
              onClick={() => handleShowPopup("signup")}
            >
              Create account
            </button>
            <span>
              By signing up, you agree to the <a href="#">Terms of Service</a>,
              including <a href="#">Cookie Use</a>.
            </span>
            <h3>Already have an account?</h3>
            <button
              id="app-auth-right-signin-btn"
              onClick={() => handleShowPopup("signin")}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <PopupNormal
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setPopupContent={setPopupContent}
        />
      )}

      <div className="app-auth-footer">
        <a href="#">About</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookies Setting</a>
        <a href="#">© 2025 Hotel Motel</a>
      </div>
    </div>
  );
}

export default AppAuth;
