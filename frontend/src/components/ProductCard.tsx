import React from 'react';

interface ProductProps {
  product: {
    name: string;
    description: string;
    type: string;
    ingredients: string;
    // Add other fields as needed
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="card">
      <h4 className="font-bold">{product.name}</h4>
      <p>{product.description}</p>
      <p>Type: {product.type}</p>
      <p>Ingredients: {product.ingredients}</p>
      {/* Pros/cons, routines would be in markdown, but for card, summarize */}
      <button className="bg-accent text-white p-1 rounded mt-2">Buy Now</button>
    </div>
  );
};

export default ProductCard;