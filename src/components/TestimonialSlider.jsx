import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/bgsvg/tes.svg";
import { testimonials } from "../data/AllData";

const PrevArrow = ({ onClick }) => (
  <button
    className="slick-prev"
    style={{
      position: "absolute",
      top: "50%",
      left: "10px",
      zIndex: 1,
      background: "transparent",
      border: "none",
      color: "#000",
      fontSize: "24px",
      transform: "translateY(-50%)",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    &#8592;
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="slick-next"
    style={{
      position: "absolute",
      top: "50%",
      right: "10px",
      zIndex: 1,
      background: "transparent",
      border: "none",
      color: "#000",
      fontSize: "24px",
      transform: "translateY(-50%)",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    &#8594;
  </button>
);

const TestimonialSlider = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,

    responsive: [
      {
        breakpoint: 1280, // xl
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024, // lg
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // md
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 480, // sm
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full px-4 py-10">
      <Slider {...sliderSettings}>
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="px-2 md:px-3">
            <div className="relative h-48 md:h-52 lg:h-56 xl:h-60 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <div className="absolute inset-0 bg-[#dba577] text-headerbordertext p-4 md:p-6 flex flex-col justify-center">
                <p className="italic text-sm md:text-base lg:text-lg line-clamp-4">
                  "{testimonial.text}"
                </p>
                <span className="text-right text-sm md:text-base font-semibold mt-2">
                  – {testimonial.author}
                </span>
                <p className="text-right text-yellow-400 text-sm">
                  {testimonial.star}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
