import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./BookingCalendar.css";
import BookingForm from "./BookingForm";
import BookingPopup from "./BookingPopup";
import ApiFunctions from "../ApiFunctions";
import BookingAlertPopup from "./AlertPopup";

function BookingCalendar() {
  const { roomId } = useParams();
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupButtonText, setPopupButtonText] = useState("");

  const navigate = useNavigate();

  const loadBookings = useCallback(async () => {
    try {
      console.log("b room id: ", roomId);
      const result = await ApiFunctions.handleBookingsByRoomID(roomId);
      if (result) {
        const bookedDates = result.map((booking) => {
          const checkInDate = new Date(booking.CheckIn).toDateString();
          const checkOutDate = new Date(booking.CheckOut).toDateString();
          return { checkInDate, checkOutDate };
        });
        setBookedDates(bookedDates);
      } else {
        setBookedDates([]);
      }
    } catch (error) {
      console.error("Error loading bookings: ", error);
    }
  }, [roomId]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

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

  const isBooked = (date) => {
    return bookedDates.some((booking) => {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      return date >= checkIn && date <= checkOut;
    });
  };

  const handleDateClick = (selectedDate) => {
    if (!isBooked(selectedDate)) {
      setSelectedDate(selectedDate);
      setIsFormVisible(true);
    } else {
      setPopupMessage("This date is already booked");
      setPopupButtonText("Try Again");
    }
  };

  const handleBookingSubmit = async (formData) => {
    const bookingData = {
      room_id: roomId,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      phone: formData.phone,
    };

    try {
      await ApiFunctions.handleCreateBooking(bookingData);
      setIsFormVisible(false);
      await loadBookings();
      setPopupMessage("Booking Successful");
      setPopupButtonText("Close");
    } catch (error) {
      setPopupMessage(error.message);
      setPopupButtonText("Try Again");
    }
  };

  const handleClosePopup = () => {
    setIsFormVisible(false);
  };

  const handleCloseAlertPopup = () => {
    setPopupMessage("");
    setPopupButtonText("");
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) => (isBooked(date) ? "booked" : "")}
        onClickDay={handleDateClick}
      />

      {isFormVisible && (
        <BookingPopup onClose={handleClosePopup}>
          <BookingForm
            selectedDate={selectedDate}
            onSubmit={handleBookingSubmit}
          />
        </BookingPopup>
      )}

      {popupMessage && (
        <BookingAlertPopup
          message={popupMessage}
          onClose={handleCloseAlertPopup}
          buttonText={popupButtonText}
        />
      )}
    </div>
  );
}

export default BookingCalendar;
