import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onSave, hotelToEdit }) => {
    const [hotelName, setHotelName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [roomSize, setRoomSize] = useState('single');
    const [location, setLocation] = useState('');
    const [imageURLs, setImageURLs] = useState([]);
    const [wifi, setWifi] = useState(false);
    const [food, setFood] = useState(false);
    const [swimmingPool, setSwimmingPool] = useState(false);
    const [parking, setParking] = useState(false);
    const [gym, setGym] = useState(false);

    useEffect(() => {
        if (hotelToEdit) {
            setHotelName(hotelToEdit.name);
            setDescription(hotelToEdit.description);
            setPrice(hotelToEdit.price);
            setRoomSize(hotelToEdit.roomSize);
            setLocation(hotelToEdit.location);
            setImageURLs(hotelToEdit.images);
            setWifi(hotelToEdit.amenities.includes('wifi'));
            setFood(hotelToEdit.amenities.includes('food'));
            setSwimmingPool(hotelToEdit.amenities.includes('swimmingPool'));
            setParking(hotelToEdit.amenities.includes('parking'));
            setGym(hotelToEdit.amenities.includes('gym'));
        } else {
            setHotelName('');
            setDescription('');
            setPrice('');
            setRoomSize('single');
            setLocation('');
            setImageURLs([]);
            setWifi(false);
            setFood(false);
            setSwimmingPool(false);
            setParking(false);
            setGym(false);
        }
    }, [hotelToEdit]);

    const handleSave = () => {
        const amenities = [];
        if (wifi) amenities.push('wifi');
        if (food) amenities.push('food');
        if (swimmingPool) amenities.push('swimmingPool');
        if (parking) amenities.push('parking');
        if (gym) amenities.push('gym');

        const newHotel = {
            id: hotelToEdit ? hotelToEdit.id : Date.now(),
            name: hotelName,
            description,
            price,
            roomSize,
            location,
            images: imageURLs,
            amenities: amenities,
        };
        onSave(newHotel);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75  flex justify-center h-screen  items-center z-50">
            <div className="bg-white text-sm gap-0 flex p-6 rounded-lg min-h-screen flex-col justify-between shadow-lg w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
                <h2 className="text-2xl font-semibold mb-1 text-gray-700">{hotelToEdit ? 'Edit Hotel' : 'Add Hotel'}</h2>
                <div className='flex flex-col gap-0'>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium">Hotel Name</label>
                        <input
                            type="text"
                            value={hotelName}
                            onChange={(e) => setHotelName(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium">Description</label>
                        <textarea rows={1}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-1 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div className='flex justify-start gap-3'>
                        <div className="mb-2">
                            <label className="block text-gray-600 font-medium">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className=" md:w-full w-24  px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-600 font-medium">Room Size</label>
                            <select
                                value={roomSize}
                                onChange={(e) => setRoomSize(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                            >
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium">Image URLs</label>
                        <textarea
                            value={imageURLs.join('\n')}
                            onChange={(e) => setImageURLs(e.target.value.split('\n'))}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                            rows={1}                    />
                            </div>
                            <div className="">
                                <label className="block text-gray-600 font-medium">Amenities</label>
                                <div className="flex flex-wrap md:gap-8 gap-4">
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            id="wifi"
                                            checked={wifi}
                                            onChange={(e) => setWifi(e.target.checked)}
                                        />
                                        <label htmlFor="wifi">WiFi</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            id="food"
                                            checked={food}
                                            onChange={(e) => setFood(e.target.checked)}
                                        />
                                        <label htmlFor="food">Food</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            id="swimmingPool"
                                            checked={swimmingPool}
                                            onChange={(e) => setSwimmingPool(e.target.checked)}
                                        />
                                        <label htmlFor="swimmingPool">Swimming Pool</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            id="parking"
                                            checked={parking}
                                            onChange={(e) => setParking(e.target.checked)}
                                        />
                                        <label htmlFor="parking">Parking</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            id="gym"
                                            checked={gym}
                                            onChange={(e) => setGym(e.target.checked)}
                                        />
                                        <label htmlFor="gym">Gym</label>
                                    </div>
                                    {/* Add more amenities here */}
                                </div>
                            </div>
                </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            );
        };
        
        export default Modal;
        
