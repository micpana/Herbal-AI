// frontend/src/components/ProductCard.tsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ProductProps {
  product: {
    name: string;
    description: string;
    type: string;
    ingredients: string;
    images?: string; // comma-separated string
    product_url?: string;
    // Add other fields
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const imageList = product.images
    ? product.images.split(',').map((img) => img.trim())
    : [];

  return (
    <div className="card overflow-hidden flex flex-col h-full">
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
                alt={`${product.name} image ${idx + 1}`}
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

      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-bold text-lg">{product.name}</h4>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{product.description}</p>
        <p className="text-sm mt-2">
          <span className="font-semibold">Type:</span> {product.type}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Ingredients:</span> {product.ingredients}
        </p>

        {product.product_url && (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white px-4 py-2 rounded mt-4 inline-block text-center hover:bg-yellow-500 transition"
          >
            Buy Now
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductCard;