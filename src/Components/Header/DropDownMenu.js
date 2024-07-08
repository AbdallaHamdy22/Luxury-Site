import React, { useEffect, useState } from 'react';
import DropdownMenu from './DropDown';
import './DropDown.css';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instance';

const DropdownMenus = ({ user }) => {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav2">
          <ul className="navbar-nav">
            {Object.keys(menuData).map(key => (
              <DropdownMenu
                key={key}
                id={key}
                title={menuData[key].title}
                sections={menuData[key].sections}
              />
            ))}
          </ul>
        </div>
        {user && user.Role.RoleName !== 'admin' ? (
          <NavLink to="/sell" className="nav-link">
            <button className="btn sell-now-btn">SELL NOW</button>
          </NavLink>
        ) : (
          user && (
            <NavLink to="/ShowDetails" className="nav-link">
              <button className="btn sell-now-btn">SHOW DETAILS</button>
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
};

export default DropdownMenus;
