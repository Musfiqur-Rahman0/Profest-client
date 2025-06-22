import { serviceCardData } from '@/lib/utils';
import React from 'react';
import HowItWorksCard from './HowItWorksCard';


const HowItWorks = () => {
    return (
         <section className=" py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">How it Works</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {serviceCardData.map((card, index) => (
            <HowItWorksCard
              key={index}
              card={card}
            />
          ))}
        </div>
      </div>
    </section>
    );
};

export default HowItWorks;