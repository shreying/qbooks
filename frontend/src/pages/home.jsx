import React from 'react';
import Hero from '../components/Home/hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      <Hero/>
      <RecentlyAdded/>
      </div> // Wrapping JSX in parentheses
  );
};

export default Home;

