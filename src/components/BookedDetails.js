import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHotel } from 'react-icons/fa';
import { MdDateRange, MdLocationOn } from 'react-icons/md';

const BookedDetails = () => {
    const [bookingDetails, setBookingDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 10;

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bookings');
                setBookingDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(bookingDetails.length / bookingsPerPage);

    // Get current bookings for the page
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookingDetails.slice(indexOfFirstBooking, indexOfLastBooking);

    // Handle next and previous button click
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (bookingDetails.length === 0) return <div className='flex justify-center items-center h-52'>NO bookings..</div>;

    return (
        <div className="container mx-auto p-6 mt-20">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Booking Details</h2>
            {currentBookings.length > 0 ? (
                currentBookings.map((booking, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-4">
                        <div className="flex items-center mb-2">
                            <FaHotel className="text-blue-500 mr-2" />
                            <p className="text-xl font-semibold text-gray-800">{booking.hotelName}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <MdDateRange className="text-blue-500 mr-2" />
                            <p className="text-gray-700">{booking.bookingDate}</p>
                        </div>
                        <div className="flex items-center">
                            <MdLocationOn className="text-blue-500 mr-2" />
                            <p className="text-gray-700">{booking.Location}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='flex justify-center items-center h-52 text-2xl'>No Bookings</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookedDetails;
