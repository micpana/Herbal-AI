import React from 'react';
import UserForm from '../components/UserForm';

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Herbal-AI: Your Herbal Advisor</h1>
      <UserForm />
    </div>
  );
};

export default Home;