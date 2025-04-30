import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/home.jpg";
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full px-4 py-10">
      <Slider {...sliderSettings}>
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="px-3">
            <div className="relative h-52 md:h-56 lg:h-60 xl:h-64 w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src={logo}
                alt={`Testimonial image ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/80 text-primary p-4 flex flex-col justify-center text-sm">
                <p className="italic py-2 line-clamp-4">"{testimonial.text}"</p>
                <span className="text-lg py-2 text-right font-semibold">
                  – {testimonial.author}
                </span>
                <p className="flex justify-center pt-4">{testimonial.star}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
