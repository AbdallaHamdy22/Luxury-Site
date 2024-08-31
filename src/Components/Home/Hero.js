import { NavLink } from 'react-router-dom';
import Modal from '../Login-Register/Modal';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import MessageCard from '../AlertMessage/Message';
import LoginModal from '../Login-Register/Login';

const Hero = () => {
  const user = useSelector((state) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selfMessage, setSelfMessage] = useState('');
  const [selfType, setSelfType] = useState('');
  const handleCloseMessage = () => {
    setShowMessage(false);
};
  const handleSellClick = () => {
    if (!user) {
      setSelfMessage("Please log in first!");
      setSelfType("alert");
      setShowMessage(true);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="hero">
      {showMessage && (
          <MessageCard
              type={selfType}
              message={selfMessage}
              onClose={handleCloseMessage}
          />
      )}
      <h1>ELEVATE YOUR STYLE!</h1>
      <h1>BUY AND SELL YOUR LUXURY ITEMS WITH US.</h1>
      {user ? (
        <NavLink to="/Sell">
          <button className="btn btn-dark">SELL NOW</button>
        </NavLink>
      ) : (
        <button className="btn btn-dark" onClick={handleSellClick}>SELL NOW</button>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginModal setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Hero;
