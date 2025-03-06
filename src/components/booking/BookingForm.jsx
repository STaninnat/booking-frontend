import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ApiFunctions from "../ApiFunctions";

function BookingForm({ selectedDate, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data on Submit:", formData);
    onSubmit(formData);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await ApiFunctions.refreshToken();
        console.log(data);
      } catch (error) {
        console.error("Token refresh failed, redirecting to /auth:", error);
        navigate("/auth");
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div className="booking-form-content">
      <h2>Reservation</h2>
      <p>Fill in the information for the date {selectedDate.toDateString()}</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-elements">
          <h3>Full Name:</h3>
          <input
            type="text"
            name="fullName"
            placeholder="ex. fullname lastname"
            value={formData.fullName}
            onChange={(e) => {
              const { name, value } = e.target;
              if (/^[A-Za-z\s]{0,30}$/.test(value)) {
                setFormData({ ...formData, [name]: value });
              }
            }}
            maxLength={30}
            required
          />
        </div>
        <div className="form-elements">
          <h3>Phone:</h3>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => {
              const { name, value } = e.target;
              if (/^\d{0,10}$/.test(value)) {
                setFormData({ ...formData, [name]: value });
              }
            }}
            required
          />
        </div>
        <div className="form-elements">
          <h3>Email:</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-elements">
          <h3>Check-In Date:</h3>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-elements">
          <h3>Check-Out Date:</h3>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!formData.checkIn || !formData.checkOut}
        >
          Confirm booking
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
