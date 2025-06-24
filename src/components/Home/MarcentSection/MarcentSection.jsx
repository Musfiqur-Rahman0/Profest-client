import React from 'react';
import location from "../../../assets/location-merchant.png"
import { Button } from '@/components/ui/button';
import backgroundImg from "../../../assets/be-a-merchant-bg.png"
const MarcentSection = () => {
    return (
        <div className='grid grid-cols-2 items-center bg-[#03373D] rounded-4xl p-20 space-y-10 relative'>
            <div className='absolute top-0'>
                <img src={backgroundImg} alt="" /> </div>
            <div className='space-y-5'>
                <h2 className='text-4xl font-bold text-white'>Merchant and Customer Satisfaction is Our First Priority</h2>
                <p className='text-slate-400'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className="flex items-center gap-5">
                <Button  className="rounded-full bg-[#CAEB66] text-black py-4">Become a Merchant</Button>
                <Button variant="outline" className="rounded-full">Earn with Profast Courier</Button>
            </div>
            </div>
            <figure>
                <img src={location} alt="" className='h-full w-full object-cover' />
            </figure>
            
        </div>
    );
};

export default MarcentSection; 