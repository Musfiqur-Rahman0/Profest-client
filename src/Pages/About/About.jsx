import AboutTabs from "@/components/about/AboutTabs";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const About = () => {
  return (
    <Container className={"px-20 py-16 mt-7 rounded-2xl bg-white space-y-10"}>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">About Us</h2>
        <p className="text-sm text-gray-400 max-w-2xl">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
      </div>
      <Separator/>
      <AboutTabs/>
    </Container>
  );
};

export default About;
