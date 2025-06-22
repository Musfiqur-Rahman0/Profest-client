import React from 'react';

const ServiceCard = ({highlight, title, icon, description}) => {
    return (
        <div
      className={`rounded-xl p-6 text-center shadow-sm  bg-white cursor-pointer hover:bg-lime-200
     transition-all duration-300 ease-linear
      `}
    >
      <div className="mx-auto mb-4 h-14 w-14">
        <img src={icon} alt={title} className="mx-auto h-full w-full object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    );
};

export default ServiceCard;