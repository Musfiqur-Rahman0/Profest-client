import { keyFeatures } from '@/lib/utils';
import React from 'react';
import FeaturesCard from './FeaturesCard';

const KeyFeatures = () => {
    return (
        <div className='space-y-8'>
            {keyFeatures.map(feature => <FeaturesCard key={feature.id} feature={feature}/>)}
        </div>
    );
};

export default KeyFeatures;