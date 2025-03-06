import { useNavigate } from "react-router-dom";
import SignUpAuth from "../auth/SignUpAuth";
import SignInAuth from "../auth/SignInAuth";
import BookingForm from "../booking/BookingForm";
import PropTypes from "prop-types";

import "./PopupNormal.css";

function PopupNormal(props) {
  const { setShowPopup, popupContent, setPopupContent } = props;
  const navigate = useNavigate();

  if (!setShowPopup) return null;

  const handleClosePopup = () => {
    setPopupContent("");
    setShowPopup(false);
    navigate("/auth");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-bg" onClick={handleClosePopup} />
      <div
        className={`popup ${
          popupContent === "signup"
            ? "popup-signup"
            : popupContent === "signin"
            ? "popup-signin"
            : popupContent === "bookingform"
            ? "popup-bookingform"
            : "popup-default"
        }`}
      >
        <i
          className="ri-close-circle-fill close-icon"
          onClick={handleClosePopup}
        ></i>

        <div className="popup-content">
          {popupContent === "signup" && <SignUpAuth />}
          {popupContent === "signin" && <SignInAuth />}
          {popupContent === "bookingform" && <BookingForm />}
        </div>
      </div>
    </div>
  );
}

PopupNormal.propTypes = {
  setShowPopup: PropTypes.bool.isRequired,
  popupContent: PropTypes.string.isRequired,
  setPopupContent: PropTypes.string,
};

export default PopupNormal;
