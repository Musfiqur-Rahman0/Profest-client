import Container from "@/components/ui/Container";
import React from "react";


import HeroSection from "@/components/Home/HeroSection/HeroSection";
import HowItWorks from "@/components/Home/HowitworksSection/HowItWorks";
import OurServicesSection from "@/components/Home/OurServices/OurServiceSection";
import SponsersSection from "@/components/Home/Sponsers/SponsersSections";
import FeaturesCard from "@/components/Home/keyFeaturesSection/FeaturesCard";
import KeyFeatures from "@/components/Home/keyFeaturesSection/KeyFeatures";
import MarcentSection from "@/components/Home/MarcentSection/MarcentSection";

const Home = () => {

  
  
  return (
    <Container className="py-8 space-y-20">
    <HeroSection/>
     <div className=" rounded-2xl"> 
       <HowItWorks/>
     </div>
     <OurServicesSection/>
     <SponsersSection/>
     <KeyFeatures/>
     <MarcentSection/>
    </Container>
  );
};

export default Home;
