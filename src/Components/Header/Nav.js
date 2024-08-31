import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaUserCircle, FaSignOutAlt, FaBox, FaBars } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import Modal from '../Login-Register/Modal';
import LoginModal from '../Login-Register/Login';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../Redux/RDXUser';
import SearchBar from './SearchBar';
import MobileSidebar from './MobileSidebar';
import axiosInstance from '../../axiosConfig/instance';
import './Nav.css';

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [menuData, setMenuData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    axiosInstance.get('Sex/')
      .then(response => {
        setMenuData(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.reload();
  };

  return (
    <>
      {deviceType === 'mobile' && (
        <>
          <nav className="mobile-navbar">
            <NavLink className="mobile-navbar-brand" to="/">
              <img src={'/Images/Logo.png'} alt="Logo" />
            </NavLink>
            <SearchBar />
            <button 
              className="mobile-navbar-toggler" 
              type="button" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars />
            </button>
          </nav>
          <MobileSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            user={user}
            handleLogout={handleLogout}
            setIsModalOpen={setIsModalOpen}
            menuData={menuData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </>
      )}
      {deviceType === 'tablet' && (
        <nav className="tablet-navbar ">
          <NavLink className="tablet-navbar-brand" to="/">
            <img src={'/Images/Logo.png'} alt="Logo" />
          </NavLink>
          <div className="tablet-navbar-content">
            <form className="tablet-search-bar">
              <SearchBar />
            </form>
            <ul className="tablet-navbar-nav">
              <li className="tablet-nav-item">
                <NavLink to="/cart" className="tablet-nav-link">
                  <FaShoppingBag /> Bag
                </NavLink>
              </li>
              <li className="tablet-nav-item">
                <NavLink to="/fav" className="tablet-nav-link">
                  <FaHeart /> Wishlist
                </NavLink>
              </li>
            </ul>
            <div className="nav-item dropdown">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="btn btn-common">
                    {user.ProfileImage ? (
                      <img src={user.ProfileImage} alt="User" className="tablet-user-photo" />
                    ) : (
                      <FaUserCircle />
                    )}
                    {user.UserName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/userDetails/Submitted">
                      <FaBox /> My Items
                    </Dropdown.Item>
                    <Dropdown.Item href="/accountDetails">
                      <FaUserCircle /> My Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="/" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <li className="tablet-nav-item">
                  <NavLink className="tablet-nav-link" onClick={() => setIsModalOpen(true)}>
                    <FaUserCircle /> Login
                  </NavLink>
                  </li>
              )}
            </div>
          </div>
        </nav>
      )}

      {deviceType === 'desktop' && (
        <nav className="navbar navbar-expand-lg">
          <NavLink className="navbar-brand" to="/">
            <img src={'/Images/Logo.png'} alt="Logo" />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="form-inline my-2 my-lg-0 mx-auto">
              <SearchBar />
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
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="btn btn-common">
                      {user.ProfileImage ? (
                        <img src={user.ProfileImage} alt="User" className="user-photo" />
                      ) : (
                        <FaUserCircle />
                      )}
                      {user.UserName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/userDetails/Submitted">
                        <FaBox /> My Items
                      </Dropdown.Item>
                      <Dropdown.Item href="/accountDetails">
                        <FaUserCircle /> My Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="/" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="nav-link" onClick={() => setIsModalOpen(true)}>
                    <FaUserCircle /> Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginModal setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default Navbar;
