import React from 'react';

interface HerbProps {
  herb: {
    name: string;
    description: string;
    type: string;
    usage: string;
    // Add other fields
  };
}

const HerbCard: React.FC<HerbProps> = ({ herb }) => {
  return (
    <div className="card">
      <h4 className="font-bold">{herb.name}</h4>
      <p>{herb.description}</p>
      <p>Type: {herb.type}</p>
      <p>Usage: {herb.usage}</p>
    </div>
  );
};

export default HerbCard;