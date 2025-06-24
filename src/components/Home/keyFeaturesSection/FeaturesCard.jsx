import React from 'react';


const FeaturesCard = ({feature}) => {
    return (
        <div className='bg-white rounded-2xl p-10 flex  items-center gap-10'>
            <figure className=''>
                <img src={feature?.image} alt=""  className=' object-contain   h-[200px] w-[200px]' />
            </figure>
            <div className='w-2  bg-red-500 z-10'></div>
            <div className='space-y-2 flex-1'>
                <h2 className='text-2xl font-bold'>{feature?.title}</h2>
                <p className='text-slate-400 '>{feature?.description}</p>
            </div>
        </div>
    );
};

export default FeaturesCard;