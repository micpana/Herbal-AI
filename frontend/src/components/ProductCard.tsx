import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface ProductProps {
  product: {
    name: string;
    description: string;
    type: string;
    ingredients: string;
    images?: string;
    product_url?: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const imageList = product.images
    ? product.images.split(',').map((img) => img.trim())
    : [];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col h-full group">
      <div className="relative">
        {imageList.length > 0 ? (
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            showStatus={false}
            className="rounded-t-3xl"
          >
            {imageList.map((img, idx) => (
              <div key={idx} className="h-56">
                <img
                  src={`http://localhost:8000/media/${img}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="h-56 bg-slate-100 flex items-center justify-center text-slate-400">
             <ShoppingCart className="w-10 h-10 opacity-10" />
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
          {product.type}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h4 className="font-bold text-lg text-slate-800 mb-2 leading-tight">{product.name}</h4>
        <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="p-3 bg-slate-50 rounded-xl">
             <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Key Ingredients</span>
             <p className="text-xs text-slate-700 font-medium line-clamp-1">{product.ingredients}</p>
          </div>
        </div>

        {product.product_url && (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            View in Store
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductCard;