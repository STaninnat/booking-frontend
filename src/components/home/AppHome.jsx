import { Helmet } from "react-helmet";
import AppHeader from "../templates/AppHeader";
import AppLayout from "../templates/AppLayout";
import AppFooter from "../templates/AppFooter";
import Carousel from "../templates/Carousel";
import RoomList from "./RoomList";
import "./AppHome.css";

function AppHome() {
  return (
    <div className="app-home">
      <Helmet>
        <title>Discover Your Next Stay - Hotel Motel</title>
      </Helmet>
      <AppHeader />
      <AppLayout>
        <Carousel />
        <RoomList />
      </AppLayout>
      <AppFooter />
    </div>
  );
}

export default AppHome;
