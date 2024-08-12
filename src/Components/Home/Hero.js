import { NavLink } from 'react-router-dom';
import Modal from '../Login-Register/Modal';
import Login from '../Login-Register/Login';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Hero = () => {
  const user = useSelector((state) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSellClick = () => {
    if (!user) {
      alert("Please login first.");
      setIsModalOpen(true)
    }
  };

  return (
    <div className="hero">
      <h1>SELL YOUR LUXURY ITEMS WITH US</h1>
      {user ? (
        <NavLink to="/Sell">
          <button className="btn btn-dark">SELL NOW</button>
        </NavLink>
      ) : (
          <button className="btn btn-dark" onClick={handleSellClick}>SELL NOW</button>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Login setUser={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Hero;
