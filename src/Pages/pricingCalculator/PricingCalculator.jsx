import Container from '@/components/ui/Container';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const PricingCalculator = () => {
    return (
        <Container className={"px-20 py-16 rounded-2xl space-y-12 bg-white mt-8"}>
            <div className='space-y-4'>
                <h2 className='text-4xl font-bold'>Pricing Calculator</h2>
                <p className='text-sm text-gray-400 max-w-2xl'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <Separator/>
            <div>
                
            </div>
        </Container>
    );
};

export default PricingCalculator;