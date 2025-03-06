import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ApiFunctions from "../ApiFunctions";
import PopupSmall from "../templates/AlertPopup";
import { useNavigate } from "react-router-dom";
import "./RoomList.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [showPopupAlert, setShowPopupAlert] = useState(false);
  const navigate = useNavigate();

  const getRooms = async () => {
    try {
      const response = await ApiFunctions.handleGetAllRooms();
      setRooms(response);
      setFilteredRooms(response);
    } catch (error) {
      console.error("error in fetch get all rooms: ", error);
      throw new Error("failed to get rooms");
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await ApiFunctions.refreshToken();
      } catch (error) {
        console.error("Token refresh failed, redirecting to /auth:", error);
        navigate("/auth");
      }
    };

    fetchToken();
  }, [navigate]);

  const handleBookingClick = async (roomId) => {
    const isAuthenticated = await ApiFunctions.checkAuthStatus();
    if (isAuthenticated) {
      navigate(`/booking/${roomId}`);
    } else {
      setShowPopupAlert(true);
    }
  };

  const handleSearch = () => {
    if (!rooms || rooms.length === 0) return;
    let filtered = rooms.filter((room) => {
      const matchesName =
        searchName.trim() === "" ||
        room.RoomName.toLowerCase().includes(searchName.toLowerCase());
      const matchesPrice =
        (minPrice === "" || room.Price >= Number(minPrice)) &&
        (maxPrice === "" || room.Price <= Number(maxPrice));
      const matchesGuests =
        guestCount === "" || room.MaxGuests >= Number(guestCount);
      return matchesName && matchesPrice && matchesGuests;
    });
    setFilteredRooms(filtered);
  };

  return (
    <div>
      <Helmet>
        <title>Discover Your Next Stay - Hotel Motel</title>
      </Helmet>
      <h2>Check our rooms</h2>

      <div className="search-bar">
        <div className="room-name-container">
          <span>Room Name:</span>
          <textarea
            placeholder="Enter room name"
            maxLength={35}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="price-container">
          <span>Price:</span>
          <div className="price-input">
            <input
              className="search-bar-price"
              type="text"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,7}$/.test(value)) {
                  setMinPrice(value);
                }
              }}
            />
            <p>-</p>
            <input
              className="search-bar-price"
              type="text"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,7}$/.test(value)) {
                  setMaxPrice(value);
                }
              }}
            />
          </div>
        </div>
        <div className="guests-container">
          <span>Guests:</span>
          <input
            className="search-bar-guest"
            type="text"
            placeholder="Guests"
            value={guestCount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,3}$/.test(value)) {
                setGuestCount(value);
              }
            }}
          />
        </div>

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="room-list">
        {!filteredRooms || filteredRooms.length === 0 ? (
          <p className="room-list-no-room">No rooms found...</p>
        ) : (
          filteredRooms.map((room) => (
            <div key={room.ID} className="room-card">
              <h3 id="room-name">{room.RoomName}</h3>
              <p id="room-description">{room.Description.String}</p>
              <span id="room-price-word">Starting price:</span>
              <p id="room-price">THB {room.Price}</p>
              <div className="room-guests-container">
                <i className="ri-team-fill room-guest-icon"></i>
                <p id="room-guests">Max Guests: {room.MaxGuests}</p>
              </div>
              <button
                className="room-booking-btn"
                onClick={() => handleBookingClick(room.ID)}
              >
                Checking Room
              </button>
            </div>
          ))
        )}
      </div>

      {showPopupAlert && <PopupSmall setShowPopupAlert={setShowPopupAlert} />}
    </div>
  );
}

export default RoomList;
