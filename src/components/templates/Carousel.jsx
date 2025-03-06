import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div className="carousel-slide">
      <Slider {...settings}>
        <div className="slide">
          <img
            className="slide-image"
            src="/images/carousel/ex_photo_1.png"
            alt="Slide 1"
          />
        </div>
        <div className="slide">
          <img
            className="slide-image"
            src="/images/carousel/ex_photo_2.png"
            alt="Slide 2"
          />
        </div>
        <div className="slide">
          <img
            className="slide-image"
            src="/images/carousel/ex_photo_3.png"
            alt="Slide 3"
          />
        </div>
        <div className="slide">
          <img
            className="slide-image"
            src="/images/carousel/ex_photo_4.png"
            alt="Slide 4"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
