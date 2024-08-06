import React, { useEffect, useState } from 'react';
import DropdownMenu from './DropDown';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instance';
import { useSelector } from 'react-redux';

const DropdownMenus = () => { 
  const user = useSelector((state) => state.user.user);
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
    return <div className="loading">Loading...</div>;
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
        <div className="navbar-buttons">
          {user && user.RoleID === 1 ? (
            <>
              <NavLink to="/sell" className="nav-link">
                <button className="btn btn-common">SELL NOW</button>
              </NavLink>
              <NavLink to="/ShowOrders" className="nav-link">
                <button className="btn btn-common">SHOW DETAILS</button>
              </NavLink>
            </>
          ) : (
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
