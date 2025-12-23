import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import ProductCard from './ProductCard';
import HerbCard from './HerbCard';
import { Sparkles, Info, Leaf, Package } from 'lucide-react';

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
    <div className="space-y-10 pb-20">
      <div className="card-glass !p-0 overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 opacity-90">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Expert Recommendation</span>
            </div>
            <h2 className="text-3xl font-extrabold">{response.recommendation_title}</h2>
          </div>
          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="herbalai-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {response.recommendations_markdown_string}
          </ReactMarkdown>
        </div>
      </div>

      {/* Herbs Section */}
      {response.recommended_herbs_list?.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold">Natural Herbs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {response.recommended_herbs_list.map((herb, idx) => (
              <HerbCard key={idx} herb={herb} />
            ))}
          </div>
        </section>
      )}

      {/* Products Section */}
      {response.recommended_products_list?.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold">Recommended Products</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {response.recommended_products_list.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4 items-start">
        <Info className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-800 mb-1">Important Disclaimer</h4>
          <p className="text-sm text-amber-700 leading-relaxed">{response.disclaimer}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDisplay;