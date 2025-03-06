import { Helmet } from "react-helmet";
import AppHeader from "../templates/AppHeader";
import AppLayout from "../templates/AppLayout";
import AppFooter from "../templates/AppFooter";
import BookingCalendar from "./BookingCalendar";

import "./AppBooking.css";

function AppBooking() {
  return (
    <div className="app-booking">
      <Helmet>
        <title>Book Your Stay - Hotel Motel</title>
      </Helmet>
      <AppHeader />
      <AppLayout>
        <BookingCalendar />
      </AppLayout>
      <AppFooter />
    </div>
  );
}

export default AppBooking;
