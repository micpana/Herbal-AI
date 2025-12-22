import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Required CSS

interface HerbProps {
  herb: {
    name: string;
    description: string;
    type: string;
    usage: string;
    images?: string; // comma-separated string
    // Add other fields
  };
}

const HerbCard: React.FC<HerbProps> = ({ herb }) => {
  const imageList = herb.images
    ? herb.images.split(',').map((img) => img.trim())
    : [];

  return (
    <div className="card overflow-hidden">
      {imageList.length > 0 ? (
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          showStatus={false}
          dynamicHeight={false}
          className="rounded-t-lg"
        >
          {imageList.map((img, idx) => (
            <div key={idx}>
              <img
                src={`http://localhost:8000/media/${img}`}
                alt={`${herb.name} image ${idx + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          No images available
        </div>
      )}

      <div className="p-4">
        <h4 className="font-bold text-lg">{herb.name}</h4>
        <p className="text-sm text-gray-600 mt-1">{herb.description}</p>
        <p className="text-sm mt-2">
          <span className="font-semibold">Type:</span> {herb.type}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Usage:</span> {herb.usage}
        </p>
      </div>
    </div>
  );
};

export default HerbCard;