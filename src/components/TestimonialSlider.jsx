import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../data/AllData";

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

const splitTestimonials = (arr, n) => {
  const chunkSize = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) =>
    arr.slice(i * chunkSize, (i + 1) * chunkSize)
  );
};

const [sliderOne, sliderTwo, sliderThree] = splitTestimonials(testimonials, 3);

const TestimonialSlider = () => {
  return (
    <div className=" px-4 w-full py-8 space-y-6">
      <Slider {...sliderSettings}>
        {sliderOne.map((testimonial, idx) => (
          <div key={idx} className="px-5 md:px-6">
            <div className="relative px-5 h-40 md:h-44 lg:h-48 xl:h-52 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-[#f5eee0e7]">
              <div className="absolute inset-0 bg-[#ffffff] text-headerbordertext px-4 md:py- md:px-8 flex flex-col justify-center">
                <p className="text-sm text-center md:text-base lg:text-lg line-clamp-4">
                  "{testimonial.text}"
                </p>
                <span className="text-right text-sm md:text-base font-semibold pt-4">
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

      <Slider {...sliderSettings}>
        {sliderTwo.map((testimonial, idx) => (
          <div key={idx} className="px-2 md:px-6">
            <div className="relative h-40 md:h-44 lg:h-48 xl:h-52 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-[#f5eee0e7]">
              <div className="absolute inset-0 bg-[#fdfdfd] text-headerbordertext px-4 md:py- md:px-8 flex flex-col justify-center">
                <p className="text-sm text-center md:text-base lg:text-lg line-clamp-4">
                  "{testimonial.text}"
                </p>
                <span className="text-right text-sm md:text-base font-semibold pt-4">
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

      <Slider {...sliderSettings}>
        {sliderThree.map((testimonial, idx) => (
          <div key={idx} className="md:px-6">
            <div className="relative h-40 md:h-44 lg:h-48 xl:h-52 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-[#f5eee0e7]">
              <div className="absolute inset-0 bg-[#ffffff] text-headerbordertext px-4 md:py- md:px-8 flex flex-col justify-center">
                <p className="text-sm text-center md:text-base lg:text-lg line-clamp-4">
                  "{testimonial.text}"
                </p>
                <span className="text-right text-sm md:text-base font-semibold pt-4">
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
