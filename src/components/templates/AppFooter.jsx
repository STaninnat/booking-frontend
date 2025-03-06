import React from "react";
import "./AppFooter.css";

const AppFooter = () => {
  return (
    <footer className="footer">
      <div className="top">
        <div className="logo">
          <img
            className="app-footer-logo"
            src="/images/logo_footer.png"
            alt="footer-logo"
          />
        </div>
        <ul>
          <li>
            <a href="#">Find Hotels</a>
          </li>
          <li>
            <a href="#">Deals & Promotions</a>
          </li>
          <li>
            <a href="#">Customer Reviews</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
        <div className="social-links">
          <a href="#">
            <i className="ri-facebook-circle-fill facebook-icon"></i>
          </a>
          <a href="#">
            <i className="ri-twitter-x-line twitter-icon"></i>
          </a>
          <a href="#">
            <i className="ri-instagram-fill instagram-icon"></i>
          </a>
          <a href="#">
            <i className="ri-youtube-fill youtube-icon"></i>
          </a>
        </div>
      </div>

      <div className="separator"></div>

      <div className="middle">
        <div className="footer-contact">
          <p>
            <i className="ri-map-pin-fill pin-icon"></i>
            Address: 123 Example Street, Bangkok
          </p>
          <p>
            <i className="ri-mail-fill mail-icon"></i>
            Email: support@hotelmotel.com
          </p>
          <p>
            <i className="ri-phone-fill phone-icon"></i>
            Phone: +66 2-123-4567
          </p>
        </div>
        <div className="links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies Setting</a>
        </div>
      </div>

      <div className="bottom">
        <p>Copyright © 2025 HotelMotel. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default AppFooter;
