import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const AddHotel = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [hotelToEdit, setHotelToEdit] = useState(null);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await axios.get('https://hotelback-haac.onrender.com/hotels');
            setHotels(response.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const handleSaveHotel = async (hotel) => {
        if (hotelToEdit) {
            try {
                await axios.put(`https://hotelback-haac.onrender.com/hotels/${hotel.id}`, hotel);
                setHotels(hotels.map(h => h.id === hotel.id ? hotel : h));
            } catch (error) {
                console.error('Error updating hotel:', error);
            }
        } else {
            try {
                const response = await axios.post('https://hotelback-haac.onrender.com/hotels', hotel);
                setHotels([...hotels, response.data]);
            } catch (error) {
                console.error('Error adding hotel:', error);
            }
        }
        setHotelToEdit(null);
    };

    const handleEditHotel = (hotel) => {
        setHotelToEdit(hotel);
        setModalOpen(true);
    };

    const handleDeleteHotel = async (id) => {
        try {
            await axios.delete(`https://hotelback-haac.onrender.com/hotels/${id}`);
            setHotels(hotels.filter(hotel => hotel.id !== id));
            toast.success('Delete Sucessfully..!', {
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
            console.error('Error deleting hotel:', error);
            toast.error(error, {
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
        }
    };

    const handleViewBookingDetails = () => {
        // Logic to navigate to booking details or display a modal with booking details
        console.log('Viewing booking details');
    };

    return (
        <div className="container mx-auto p-6 mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Hotels</h2>
                <div>
                    <button
                        onClick={() => {
                            setHotelToEdit(null);
                            setModalOpen(true);
                        }}
                        class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
                        <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span class="relative">Add Hotel</span>


                    </button>

                    <Link to={'/bookings'}>
                        <button
                            onClick={handleViewBookingDetails}
                            class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
                            <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                            <span class="relative">Booking Details</span>

                        </button>
                    </Link>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveHotel}
                hotelToEdit={hotelToEdit}
            />

            <div className="mt-8">
                <ul className="space-y-4">
                    {hotels.map((hotel) => (
                        <li
                            key={hotel.id}
                            className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow flex flex-col space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xl font-semibold text-gray-800">{hotel.name}</p>
                                    <p className="text-gray-700 mt-1">{hotel.description.slice(0, 190) + "..."}</p>
                                    <p className="text-gray-700 mt-1">Price: ${hotel.price}</p>
                                    <p className="text-gray-700 mt-1">Room Size: {hotel.roomSize}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditHotel(hotel)}
                                        className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteHotel(hotel.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                {hotel.images.map((image, idx) => (
                                    <img
                                        key={idx}
                                        src={image}
                                        alt={`Hotel ${hotel.name}`}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddHotel;
