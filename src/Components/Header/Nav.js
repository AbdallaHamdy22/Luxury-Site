import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './Nav.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ height: '90px' }}>
    <NavLink className="navbar-brand" to="/">Royal Luxury</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <form className="form-inline my-4 my-lg-0 mx-auto">
        <div className="input-group">
          <input className="form-control mr-sm-4 search-bar" type="search" placeholder="    What are you looking for?" aria-label="Search" style={{ width: '500px', fontSize: '20px', position: 'relative' }} />
          <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaSearch style={{ fontSize: '20px' }} />
          </div>
        </div>
      </form>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link" style={({ isActive }) => ({
            color: isActive ? 'white' : '',
            backgroundColor: isActive ? 'gray' : '',
            borderRadius: '8px',
          })}><FaShoppingBag /> Bag</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/fav" className="nav-link" style={({ isActive }) => ({
            color: isActive ? 'white' : '',
            backgroundColor: isActive ? 'gray' : '',
            borderRadius: '8px',
          })}><FaHeart /> Wishlist</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/join" className="nav-link" style={({ isActive }) => ({
            color: isActive ? 'white' : '',
            backgroundColor: isActive ? 'gray' : '',
            borderRadius: '8px',
          })}><FaUser /> Sign in</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Sell" className="nav-link">
            <button className="btn sell-now-btn">SELL NOW</button>
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;