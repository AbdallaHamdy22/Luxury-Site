import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaUserCircle, FaSignOutAlt, FaBox } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import Modal from '../Login-Register/Modal';
import Login from '../Login-Register/Login';

const Navbar = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <NavLink className="navbar-brand" to="/">
        <img src={'/Images/Logo2.png'} alt="Logo" />
      </NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <form className="form-inline my-2 my-lg-0 mx-auto">
          <div className="input-group search-container">
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
            <li className="nav-item dropdown">
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-dropdown">
                  <img src={user.ProfileImage} alt="User" className="user-photo" />
                  {user.UserName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/userDetails/Submitted">
                    <FaBox /> My Items
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to={`/accountDetails/${user.ID}`}>
                    <FaUserCircle /> My Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="/" onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}>
                    <FaSignOutAlt /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            <li className="nav-item">
              <button className="nav-link" onClick={() => setIsModalOpen(true)}>
                <FaUser /> Login
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
