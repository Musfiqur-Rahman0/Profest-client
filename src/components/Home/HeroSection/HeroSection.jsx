import React from 'react';
// import Swiper JS
import { Swiper, SwiperSlide,  } from "swiper/react";
import "swiper/css";
import img1 from "../../../assets/banner/banner1.png";
import img2 from "../../../assets/banner/banner2.png";
import img3 from "../../../assets/banner/banner3.png";

import { Autoplay, Navigation,  } from "swiper/modules";
// import 'swiper/css/navigation';
import { Button } from "@/components/ui/button";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useRef } from 'react';
const HeroSection = () => {

    const prevRef = useRef();
      const nextRef = useRef();

    return (
       <Swiper
        spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        loop
        navigation={{
          prevEl : prevRef,
          nextEl : nextRef
        }}
        onBeforeInit={(swiper)=> {
          swiper.params.navigation.prevEl =  prevRef.current;
          swiper.params.navigation.nextEl =  nextRef.current;
        }}
        autoplay={{
          delay : 2000,
          disableOnInteraction : false
        }}
        modules={[Navigation,  Autoplay]}
        // onSwiper={(swiper) => console.log(swiper)}
        className="w-full relative"
      >
        {[img1, img2, img3].map((image, index) => (
          <SwiperSlide key={index} className="w-full ">
            <img src={image} alt="" />

          </SwiperSlide>
        ))}

        <Button
       ref= {prevRef}
       variant={"ghost"}
        className="absolute right-2 top-1/2 z-50 rounded-[50%] "
      >
        <MdKeyboardDoubleArrowRight size={50}/>
      </Button>
      <Button
      ref={nextRef}
      variant={'ghost'}
        className="absolute left-2 top-1/2 z-50 rounded-[50%]"
      >
        <MdKeyboardDoubleArrowLeft size={50}/>
      </Button>
      </Swiper>
    );
};

export default HeroSection;