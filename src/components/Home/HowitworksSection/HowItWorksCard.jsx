import React from 'react';

const HowItWorksCard = ({card}) => {
    const {title, description, icon : Icon } = card
    return (
          <div className="bg-white rounded-xl shadow-sm p-6  max-w-xs">
      {Icon && <Icon className=" mb-4 h-8 w-8 text-primary" />}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    );
};

export default HowItWorksCard;