import { NavLink } from 'react-router-dom';
import './Hero.css'
const Hero = () => (
  <div className="hero">
    <h1>SELL YOUR LUXURY ITEMS WITH US</h1>
    <NavLink to="/Sell">
    <button className="btn btn-dark">SELL NOW</button>
    </NavLink>
  </div>
); 
export default Hero;