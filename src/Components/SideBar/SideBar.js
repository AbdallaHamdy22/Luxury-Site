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
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="sidebar-content">
          <div className="sidebar-menu">
            <div className="sidebar-menu-item">
              <NavLink exact to="/ShowOrders" activeClassName="activeClicked" className="sidebar-navlink">
                <FontAwesomeIcon icon={faStickyNote} /> Details Menu
              </NavLink>
            </div>
          </div>
          <div className="sidebar-menu">
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink exact to="/ShowBrands" activeClassName="activeClicked" className="sidebar-navlink">
                  <FontAwesomeIcon icon={faTh} /> Brands List
                </NavLink>
              </div>
            </div>
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink exact to="/ShowCategories" activeClassName="activeClicked" className="sidebar-navlink">
                  <FontAwesomeIcon icon={faTh} /> Categories List
                </NavLink>
              </div>
            </div>
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink exact to="/ShowColors" activeClassName="activeClicked" className="sidebar-navlink">
                  <FontAwesomeIcon icon={faTh} /> Colors List
                </NavLink>
              </div>
            </div>
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink exact to="/ShowGenders" activeClassName="activeClicked" className="sidebar-navlink">
                  <FontAwesomeIcon icon={faTh} /> Genders List
                </NavLink>
              </div>
            </div>
            <div className="sidebar-submenu">
              <div className="sidebar-submenu-title">
                <NavLink exact to="/ShowProducts" activeClassName="activeClicked" className="sidebar-navlink">
                  <FontAwesomeIcon icon={faTh} /> Products List
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
