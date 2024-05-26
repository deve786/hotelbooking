
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddHotel from './components/AddHotel';
import Banner from './components/Banner';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HotelDetail from './components/HotelDetail';
import BookedDetails from './components/BookedDetails';
import { useEffect } from 'react';
import Contact from './components/Contact';
import About from './components/About';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
   <div className='min-h-screen bg-neutral-100'>
      <div className='flex justify-between flex-col min-h-screen'>
        <div className=''>
          <div className="App " >
            <Navbar/>
            
            
          </div>
        <Routes>
            <Route path='/' element={<Banner/>}></Route>
            <Route path='/addhotel' element={<AddHotel/>}></Route>
            <Route path="/hotels/:id" element={<HotelDetail/>} />
            <Route path="/bookings" element={<BookedDetails/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            
        </Routes>
        </div>
      
      <Footer/>
      </div>
      <ToastContainer />
   </div>
  );
}

export default App;
