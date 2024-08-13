import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStickyNote, faTh } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <FontAwesomeIcon 
            icon={faBars} 
            className="fa-icon" 
            style={{ fontSize: '1.5em', color: 'var(--accent-color)' }}
          />
        </div>
        <div className="sidebar-content">
          <div className="sidebar-menu">
            <div className="sidebar-menu-item">
              <NavLink 
                to="/ShowOrders" 
                className={({ isActive }) => (isActive ? "activeClicked" : "sidebar-navlink")}
              >
                <FontAwesomeIcon 
                  icon={faStickyNote} 
                  className="fa-icon" 
                  style={{ fontSize: '1.2em', marginRight: '10px' }} 
                /> 
                Details Menu
              </NavLink>
            </div>
          </div>
          <div className="sidebar-menu">
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink 
                  to="/ShowBrands" 
                  className={({ isActive }) => (isActive ? "activeClicked" : "sidebar-navlink")}
                >
                  <FontAwesomeIcon 
                    icon={faTh} 
                    className="fa-icon" 
                    style={{ fontSize: '1.2em', marginRight: '10px' }} 
                  /> 
                  Brands List
                </NavLink>
              </div>
            </div>
            {/* Repeat the same structure for other sidebar submenu items */}
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink 
                  to="/ShowCategories" 
                  className={({ isActive }) => (isActive ? "activeClicked" : "sidebar-navlink")}
                >
                  <FontAwesomeIcon 
                    icon={faTh} 
                    className="fa-icon" 
                    style={{ fontSize: '1.2em', marginRight: '10px' }} 
                  /> 
                  Categories List
                </NavLink>
              </div>
            </div>
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink 
                  to="/ShowColors" 
                  className={({ isActive }) => (isActive ? "activeClicked" : "sidebar-navlink")}
                >
                  <FontAwesomeIcon 
                    icon={faTh} 
                    className="fa-icon" 
                    style={{ fontSize: '1.2em', marginRight: '10px' }} 
                  /> 
                  Colors List
                </NavLink>
              </div>
            </div>
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink 
                  to="/ShowGenders" 
                  className={({ isActive }) => (isActive ? "activeClicked" : "sidebar-navlink")}
                >
                  <FontAwesomeIcon 
                    icon={faTh} 
                    className="fa-icon" 
                    style={{ fontSize: '1.2em', marginRight: '10px' }} 
                  /> 
                  Genders List
                </NavLink>
              </div>
            </div>
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink 
                  to="/ShowProducts" 
                  className={({ isActive }) => (isActive ? "activeClicked" : "sidebar-navlink")}
                >
                  <FontAwesomeIcon 
                    icon={faTh} 
                    className="fa-icon" 
                    style={{ fontSize: '1.2em', marginRight: '10px' }} 
                  /> 
                  Products List
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
