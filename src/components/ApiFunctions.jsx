async function checkAuthStatus() {
  try {
    const url = "/v1/auth/check";
    const response = await fetchWithAlert(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
}

async function handleCreateUserSubmit(
  userData,
  setSuccessMessage,
  setError,
  navigate
) {
  try {
    const url = "/v1/user/signup";
    const response = await fetchWithAlert(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Internal server error. Please try again later.");
      return;
    }
    setSuccessMessage("Account created successfully!");
    setTimeout(() => {
      navigate("/");
      setSuccessMessage("");
    }, 1500);
  } catch (error) {
    console.error("Internal server error: ", error);
    setError("Internal server error. Please try again later.");
  }
}

async function handleLoginSubmit(
  userData,
  setSuccessMessage,
  setError,
  navigate
) {
  try {
    console.log("Submitting user data...");
    const url = "/v1/user/signin";
    const response = await fetchWithAlert(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Internal server error. Please try again later.");
      return;
    }

    setSuccessMessage("Signed in successfully!");
    setTimeout(() => {
      console.log("Attempting to reload the page...");
      window.location.reload();
      navigate("/");
      setSuccessMessage("");
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error("Internal server error: ", error);
    setError("Internal server error. Please try again later.");
  }
}

async function handleSignout() {
  try {
    const url = "/v1/user/signout";
    const response = await fetchWithAlert(url, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("logout failed");
    }
  } catch (error) {
    console.error("Error in signout:", error);
    throw error;
  }
}

async function handleGetAllRooms() {
  try {
    const url = "/v1/rooms";
    const response = await fetchWithAlert(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("failed to get rooms");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error in fetch get all rooms: ", error);
    throw new Error("Failed to get rooms");
  }
}

async function fetchBookings() {
  try {
    const url = "/v1/bookings";
    const response = await fetchWithAlert(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("failed to get bookings");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error in fetch booking: ", error);
    throw new Error("Failed to get bookings");
  }
}

async function handleCreateBooking(userData) {
  try {
    const url = "/v1/bookings";
    const response = await fetchWithAlert(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Error in fetch booking: ", error);
    throw error;
  }
}

async function handleBookingsByRoomID(room_id) {
  try {
    const url = `/v1/bookings/room/${room_id}`;
    const response = await fetchWithAlert(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get bookings");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error in fetch booking: ", error);
    throw new Error("Failed to get bookings");
  }
}

async function refreshToken() {
  try {
    const response = await fetch("/v1/user/refresh-key", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
}

async function fetchWithAlert(url, options) {
  try {
    let response = await fetch(url, options);

    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
}

export default {
  checkAuthStatus,
  handleCreateUserSubmit,
  handleSignout,
  handleLoginSubmit,
  handleCreateBooking,
  handleBookingsByRoomID,
  fetchBookings,
  refreshToken,
  handleGetAllRooms,
};
