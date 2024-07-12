import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './Nav.css';
import { Dropdown } from 'react-bootstrap';
import Modal from '../Login-Register/Modal';
import Login from '../Login-Register/Login';

const Navbar = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ height: '90px' }}>
      <NavLink className="navbar-brand" to="/">
        <img src={'/Images/Logo2.png'} alt="Logo" />
      </NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <form className="form-inline my-2 my-lg-0 mx-auto">
          <div className="input-group">
            <div className="search-icon">
              <FaSearch />
            </div>
            <input className="form-control search-bar" type="search" placeholder="What are you looking for?" aria-label="Search" />
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
            <li>
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                  {user.UserName}!
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/accountDetails">Account Settings</Dropdown.Item>
                  <Dropdown.Item href="/" onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            <li>
              <button className="nav-link" onClick={() => setIsModalOpen(true)}>
                <FaUser /> Sign in
              </button>
            </li>
          )}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Login setUser={() => setIsModalOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;
