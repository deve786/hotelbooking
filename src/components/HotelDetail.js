import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faUtensils, faSwimmingPool, faParking, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { Bounce, toast } from 'react-toastify';
const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hotels/${id}`);
        setHotel(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
      }
    };
    
    fetchHotel();
  }, [id]);
  
  const handleBookNow = async () => {
    try {
      await axios.post('http://localhost:5000/bookings', {
        hotelId: hotel.id,
        hotelName: hotel.name,
        bookingDate: selectedDate,
        Location: hotel.location,
      });
      toast.success('Successfly Booked..!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
      
    } catch (error) {
      console.error('Error booking hotel:', error);
    }
  };

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 mt-10">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 lg:pr-6">
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">{hotel.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            <strong>Location:</strong> {hotel.location} | <strong>Type:</strong> {hotel.roomSize}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {hotel.images.map((image, idx) => (
              <img key={idx} src={image} alt={`Hotel ${hotel.name}`} className="w-full h-60 object-cover rounded-lg" />
            ))}
          </div>
          <p className="text-gray-700 mb-2 mt-10">{hotel.description}</p>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          
            <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-2 flex items-center space-x-2 shadow-lg">
              <FontAwesomeIcon icon={faWifi} className="text-blue-500" />
              <p>WiFi: {hotel.amenities.includes('wifi') ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-2 flex items-center space-x-2 shadow-lg">
              <FontAwesomeIcon icon={faUtensils} className="text-green-500" />
              <p>Food: {hotel.amenities.includes('food') ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-2 flex items-center space-x-2 shadow-lg">
              <FontAwesomeIcon icon={faSwimmingPool} className="text-yellow-500" />
              <p>Swimming Pool: {hotel.amenities.includes('pool') ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-2 flex items-center space-x-2 shadow-lg">
              <FontAwesomeIcon icon={faParking} className="text-red-500" />
              <p>Parking: {hotel.amenities.includes('parking') ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-2 flex items-center space-x-2 shadow-lg">
              <FontAwesomeIcon icon={faDumbbell} className="text-purple-500" />
              <p>Gym: {hotel.amenities.includes('gym') ? 'Available' : 'Not Available'}</p>
            </div>
         
          </div>
        </div>
        <div className="lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
          <div className="sticky top-24">
            <label className="block text-gray-600 font-medium mb-2">
              Select Booking Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none mb-4"
            />
            <button
              onClick={handleBookNow}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
