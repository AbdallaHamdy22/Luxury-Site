import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './Nav.css';
import { Dropdown } from 'react-bootstrap';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ height: '90px' }}>
      <NavLink className="navbar-brand" to="/">Royal Luxury</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <form className="form-inline my-2 my-lg-0 mx-auto">
          <div className="input-group">
            <input className="form-control search-bar" type="search" placeholder="What are you looking for?" aria-label="Search" />
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link">
              <FaShoppingBag /> Bag
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/fav" className="nav-link">
              <FaHeart /> Wishlist
            </NavLink>
          </li>
          {user ? (
            <li className="nav-item">
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                  Welcome, {user.UserName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/account-settings">Account Settings</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/join" className="nav-link">
                <FaUser /> Sign in
              </NavLink>
            </li>
          )}
          <div className="navbar-button">
          <li className="nav-item">
            {user && user.Role.RoleName !== 'admin' ? (
              <NavLink to="/sell" className="nav-link">
                <button className="btn sell-now-btn">SELL NOW</button>
              </NavLink>
            ) : (
              user && (
                <NavLink to="/Show" className="nav-link">
                  <button className="btn sell-now-btn">SHOW DETAILS</button>
                </NavLink>
              )
            )}
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
