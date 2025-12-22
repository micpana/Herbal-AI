import React from 'react';
import UserForm from '../components/UserForm';
import { Leaf } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-emerald-100/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-100/20 blur-3xl rounded-full translate-y-1/4 -translate-x-1/4" />

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-6 text-emerald-600">
            <Leaf className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Herbal<span className="text-emerald-600">AI</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Your intelligent guide to nature’s pharmacy. Share your goals, and we’ll recommend the best herbal remedies for you.
          </p>
        </header>

        <section className="relative">
          <UserForm />
        </section>
        
        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Herbal-AI Insights. For informational purposes only.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;