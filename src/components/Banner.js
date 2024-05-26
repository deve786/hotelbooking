import React from 'react';
import Cards from './Cards';
import { Link as ScrollLink } from 'react-scroll';

const Banner = () => {
  return (
    <>
      <div className="relative w-full h-screen bg-gray-800">
        {/* Background Image */}
        <div
          className="absolute w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/featured/?hotel')" }}
        ></div>

        {/* Overlay */}
        <div className="absolute w-full h-full bg-black opacity-50"></div>

        {/* Banner Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">Your Dream Getaway Awaits</h1>
            <p className="text-xl mb-8">Book your stay at top-rated hotels and resorts worldwide.</p>
            <ScrollLink
              to="explore"
              smooth={true}
              duration={500}
              className="cursor-pointer mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Explore Now
            </ScrollLink>
          </div>
        </div>
      </div>
      <Cards />
    </>
  );
};

export default Banner;
