import React from "react"
import ServiceCard from "./ServiceCard"
import { services } from "@/lib/utils"



export default function OurServicesSection() {
  return (
    <section className="bg-[#003049] text-white py-16 px-4 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              description={service.description}
              icon={service.icon}
              highlight={service.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
