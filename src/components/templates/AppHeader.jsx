import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import "./AppHeader.css";

function AppHeader() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const loggedIn = await ApiFunctions.checkAuthStatus();
      setIsLoggedIn(loggedIn);
    };

    fetchAuthStatus();
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <img
        className="app-header-logo"
        src="/images/logo_header.png"
        alt="header-logo"
      />
      <div className="header-home-container">
        <div className="header-home-icon" onClick={() => navigate("/")}>
          <i className="ri-home-2-fill header-home-home"></i>
          <h3>Home</h3>
        </div>
        <div className="header-home-icon">
          <i className="ri-search-fill header-home-find"></i>
          <h3>Find & Reserve</h3>
        </div>
        <div className="header-home-icon">
          <i className="ri-news-fill header-home-blog"></i>
          <h3>Blog</h3>
        </div>
        <div className="header-home-icon">
          <i className="ri-contacts-book-2-fill header-home-contact"></i>
          <h3>Contact</h3>
        </div>
      </div>
      <div className="header-home-user-container">
        <i
          className="ri-account-circle-fill header-home-user"
          onClick={() => navigate(isLoggedIn ? "#" : "/auth")}
        ></i>
        {isLoggedIn && (
          <i
            className="ri-logout-circle-r-fill header-home-logout"
            onClick={async () => {
              const confirmLogout = window.confirm(
                "Are you sure you want to logout?"
              );
              if (confirmLogout) {
                await ApiFunctions.handleSignout();
                setIsLoggedIn(false);
                navigate("/auth");
              }
            }}
          ></i>
        )}
      </div>
    </nav>
  );
}

export default AppHeader;
