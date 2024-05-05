"use client"

import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Slideshow extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    const slideStyle: React.CSSProperties = {
      width: "100%",
      textAlign: "center", 
    };

    return (
      <Slider {...settings}>
        <div style={slideStyle}>
          <img src="/slide1.jpg" style={slideStyle} />
        </div>
        <div style={slideStyle}>
          <img src="/slide2.jpg" style={slideStyle} />
        </div>
        <div style={slideStyle}>
          <img src="/slide3.jpg" style={slideStyle} />
        </div>
      </Slider>
    );
  }
}

export default Slideshow;
