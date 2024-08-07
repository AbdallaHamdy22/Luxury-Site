import { NavLink } from 'react-router-dom';
import './Hero.css';
import { useSelector } from 'react-redux';

const Hero = () => {
  const user = useSelector((state) => state.user.user);

  const handleSellClick = () => {
    if (!user) {
      alert("Please login first.");
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
        <NavLink to="/join">
          <button className="btn btn-dark" onClick={handleSellClick}>SELL NOW</button>
        </NavLink>
      )}
    </div>
  );
};

export default Hero;
