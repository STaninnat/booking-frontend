import React from "react";
import { Route, Routes } from "react-router-dom";
import "./global.css";
import AppHome from "./components/home/AppHome";
import AppAuth from "./components/auth/AppAuth";
import AppBooking from "./components/booking/AppBooking";
import ProtectedRoute from "./components/ProtectedRoute";
import "remixicon/fonts/remixicon.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/auth" element={<AppAuth />} />
        <Route
          path="/booking/:roomId"
          element={
            <ProtectedRoute>
              <AppBooking />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
