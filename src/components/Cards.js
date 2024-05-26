import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Cards() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://hotelback-haac.onrender.com/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);
  console.log(hotels);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    
    setSortOption(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilterOption(event.target.value);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAndFilteredHotels = filteredHotels
    .filter((hotel) => (filterOption ? hotel.roomSize === filterOption : true))
    .sort((a, b) => {
      if (sortOption === 'price-asc') {
        return a.price - b.price;
      } else if (sortOption === 'price-desc') {
        return b.price - a.price;
      } else if (sortOption === 'rating-asc') {
        return a.rating - b.rating;
      } else if (sortOption === 'rating-desc') {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });

  return (
    <div className='scroll-smooth' id='explore'>
      <section className="py-20">
        <h1 className="mb-12 text-center font-sans sm:text-5xl font-bold text-gray-900 text-xl">
          Accommodations<span className="text-blue-600">.</span>
        </h1>
        <div className="mb-8 flex flex-col justify-center gap-4 md:flex-row p-3">
          <input
            type="text"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded-lg md:w-64  w-full   shadow-sm focus:outline-none "
          />
          <select
            value={sortOption}
            onChange={handleSort}
            className="p-2 border rounded-lg shadow-sm focus:outline-none "
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            {/* <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option> */}
          </select>
          <select
            value={filterOption}
            onChange={handleFilter}
            className="p-2 border rounded-lg shadow-sm focus:outline-none "
          >
            <option value="">Filter by Type</option>
            <option value="single">single</option>
            <option value="double">double</option>
            
          </select>
        </div>
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredHotels.map((hotel) => (
            <Link to={`/hotels/${hotel.id}`} key={hotel.id} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
              <article className="relative flex items-end overflow-hidden rounded-xl w-full">
                <img src={hotel?.images[0]} className="object-cover w-full h-52" alt={`${hotel.name}`} />
                <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-slate-400 ml-1 text-sm">4.9</span>
                </div>
              </article>
              <div className="mt-1 p-2">
                <h2 className="text-slate-700">{hotel.name}</h2>
                <p className="text-slate-400 mt-1 text-sm">{hotel.location}</p>
                <div className="mt-3 flex items-end justify-between">
                  <p>
                    <span className="text-lg font-bold text-blue-500">${hotel.price}</span>
                    <span className="text-slate-400 text-sm">/night</span>
                  </p>
                  <div className="group inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-blue-500 h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Cards;
