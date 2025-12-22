import React from 'react';
import ReactMarkdown from 'react-markdown';
import ProductCard from './ProductCard';
import HerbCard from './HerbCard';

interface ResponseProps {
  response: {
    recommendation_title: string;
    recommendations_markdown_string: string;
    recommended_herbs_list: any[];
    recommended_products_list: any[];
    disclaimer: string;
  };
}

const RecommendationDisplay: React.FC<ResponseProps> = ({ response }) => {
  return (
    <div className="card mt-8">
      <h2 className="text-2xl font-bold mb-4">{response.recommendation_title}</h2>
      <ReactMarkdown>{response.recommendations_markdown_string}</ReactMarkdown>
      
      <h3 className="text-xl font-bold mt-6 mb-2">Recommended Herbs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {response.recommended_herbs_list.map((herb, idx) => (
          <HerbCard key={idx} herb={herb} />
        ))}
      </div>
      
      <h3 className="text-xl font-bold mt-6 mb-2">Recommended Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {response.recommended_products_list.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
      
      <p className="mt-6 italic">{response.disclaimer}</p>
    </div>
  );
};

export default RecommendationDisplay;