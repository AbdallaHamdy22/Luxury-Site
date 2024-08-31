import React, { useEffect, useState } from 'react';
import DropdownMenu from './DropDown';
import { NavLink, useLocation } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instance';
import { useSelector } from 'react-redux';
import './DropDown.css';

const DropdownMenus = () => {
  const user = useSelector((state) => state.user.user);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axiosInstance.get('Sex/')
      .then(response => {
        setMenuData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-menu') && !event.target.closest('.nav-item')) {
        setSelectedItem(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (!location.pathname.startsWith('/items')) {
      setSelectedItem(null);
    }
  }, [location]);


  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="navbar-container border-top">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav2">
          <ul className="navbar-nav">
            {Object.keys(menuData).map(key => (
              <DropdownMenu
                key={key}
                id={key}
                title={menuData[key].title}
                sections={menuData[key].sections}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </ul>
        </div>
        <div className="navbar-buttons">
          {user && user.RoleID === 1 ? (
            <>
              <NavLink to="/sell" className="nav-link">
                <button className="btn btn-common">SELL NOW</button>
              </NavLink>
              <NavLink to="/ShowSellQueue" className="nav-link">
                <button className="btn btn-common">Control Panel</button>
              </NavLink>
            </>
          ) : user && (
            <NavLink to="/sell" className="nav-link">
              <button className="btn btn-common">SELL NOW</button>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default DropdownMenus;
