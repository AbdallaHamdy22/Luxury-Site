import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Nav.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <NavLink className="navbar-brand" to="/">Royal Luxury</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <form className="form-inline my-4 my-lg-0 mx-auto">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><FaSearch style={{ fontSize: '20px' }} /></span>
          </div>
          <input className="form-control mr-sm-4 search-bar" type="search" placeholder="What are you looking for?" aria-label="Search" style={{ width: '400px', fontSize: '20px' }} />
        </div>
      </form>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/join" className="nav-link" style={({ isActive }) => ({
            color: isActive ? 'white' : '',
            backgroundColor: isActive ? 'gray' : '',
            borderRadius: '8px',
          })}>Sign in</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/fav" className="nav-link" style={({ isActive }) => ({
            color: isActive ? 'white' : '',
            backgroundColor: isActive ? 'gray' : '',
            borderRadius: '8px',
          })}>Wishlist</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Items" className="nav-link" style={({ isActive }) => ({
            color: isActive ? 'white' : '',
            backgroundColor: isActive ? 'gray' : '',
            borderRadius: '8px',
          })}>Bag</NavLink>
        </li>
        <li className="nav-item">
          <button className="btn sell-now-btn">SELL NOW!</button>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
