// components/LogoCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import amazon from  '../../../assets/brands/amazon.png'
import casio from '../../../assets/brands/casio.png'
import mooster from '../../../assets/brands/moonstar.png'
import randstad from  '../../../assets/brands/randstad.png'
import startPeople from '../../../assets/brands/start-people 1.png'
import amazonVector from '../../../assets/brands/amazon_vector.png'
import start from  '../../../assets/brands/start.png'
// Sample brands (replace with real image paths)
const brands = [
  amazon,
  amazonVector,
  casio,
  mooster,
  randstad,
  startPeople,
  start,
];

const SponsersSection = () => {
  return (
    <div className=" py-6 space-y-10">
      <h2 className="text-center text-[#003049] text-2xl font-extrabold ">
        We've helped thousands of sales teams
      </h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={3000}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="px-4"
      >
        {brands.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img src={logo} alt={`Client logo ${index + 1}`} className="h-8 object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SponsersSection;
