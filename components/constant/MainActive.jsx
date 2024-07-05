import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { ServiceData } from "../constant";
import '../constant/mainactive.css';

// Import styles for Autoplay module
import "swiper/css/autoplay";

const MainActive = () => {
  return (
    <div className="slider_main text-center p-10 ">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          1000: {
            slidesPerView: 1,
            spaceBetween: 15,
          }
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        autoplay={{
          delay: 2000, // Set the delay to 2 seconds (2000 milliseconds)
        }}
        className="length"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="slider">
              <img src={item.imgUrl} alt={item.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainActive;
