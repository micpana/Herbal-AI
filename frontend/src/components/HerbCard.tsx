import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ClipboardList, FlaskConical } from 'lucide-react';

interface HerbProps {
  herb: {
    name: string;
    description: string;
    type: string;
    usage: string;
    images?: string;
  };
}

const HerbCard: React.FC<HerbProps> = ({ herb }) => {
  const imageList = herb.images
    ? herb.images.split(',').map((img) => img.trim())
    : [];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
      <div className="relative group">
        {imageList.length > 0 ? (
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={6000}
            showStatus={false}
            className="rounded-t-3xl"
          >
            {imageList.map((img, idx) => (
              <div key={idx} className="h-72">
                <img
                  // src={`http://localhost:8000/media/${img}`}
                  src={img}
                  alt={herb.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="h-72 bg-slate-100 flex flex-col items-center justify-center text-slate-400">
            <FlaskConical className="w-12 h-12 mb-2 opacity-20" />
            <span className="text-sm font-medium">Image coming soon</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {herb.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-900 mb-2">{herb.name}</h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {herb.description}
        </p>
        
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 text-emerald-700">
            <ClipboardList className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Preparation & Usage</span>
          </div>
          <p className="text-slate-700 text-sm italic font-medium">
            "{herb.usage}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default HerbCard;