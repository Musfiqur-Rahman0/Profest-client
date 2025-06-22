import Container from "@/components/ui/Container";
import React from "react";


import HeroSection from "@/components/Home/HeroSection/HeroSection";
import HowItWorks from "@/components/Home/HowitworksSection/HowItWorks";
import OurServicesSection from "@/components/Home/OurServices/OurServiceSection";

const Home = () => {

  
  
  return (
    <Container className="py-8">
    <HeroSection/>
     <div className="my-7 rounded-2xl"> 
       <HowItWorks/>
     </div>
     <OurServicesSection/>
    </Container>
  );
};

export default Home;
