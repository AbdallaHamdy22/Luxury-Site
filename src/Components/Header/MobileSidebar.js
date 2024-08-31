// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaShoppingBag, FaHeart, FaUserCircle, FaSignOutAlt, FaBox } from 'react-icons/fa';
// import { Dropdown } from 'react-bootstrap';
// import './MobileSidebar.css';

// const MobileSidebar = ({ isOpen, onClose, user, handleLogout, setIsModalOpen, menuData, selectedItem, setSelectedItem }) => {
//     return (
//         <div className={`mobsidebar ${isOpen ? 'open' : ''}`}>
//             <button className="close-btn" onClick={onClose}>&times;</button>
//             <ul className="sidebar-nav">
//                 {user && user.RoleID === 1 ? (
//                     <>
//                         <li className="sidebar-nav-item">
//                             <NavLink to="/sell" className="sidebar-nav-link" onClick={onClose}>
//                                 <button className="btn btn-common">SELL NOW</button>
//                             </NavLink>
//                         </li>
//                         <li className="sidebar-nav-item">
//                             <NavLink to="/ShowSellQueue" className="sidebar-nav-link" onClick={onClose}>
//                                 <button className="btn btn-common">Control Panel</button>
//                             </NavLink>
//                         </li>
//                     </>
//                 ) : user && (
//                     <li className="sidebar-nav-item">
//                         <NavLink to="/sell" className="sidebar-nav-link" onClick={onClose}>
//                             <button className="btn btn-common">SELL NOW</button>
//                         </NavLink>
//                     </li>
//                 )}
//                 <li className="sidebar-nav-item">
//                     <NavLink to="/cart" className="sidebar-nav-link" onClick={onClose}>
//                         <FaShoppingBag /> Bag
//                     </NavLink>
//                 </li>
//                 <li className="sidebar-nav-item">
//                     <NavLink to="/fav" className="sidebar-nav-link" onClick={onClose}>
//                         <FaHeart /> Wishlist
//                     </NavLink>
//                 </li>
//                 {Object.keys(menuData).map(key => (
//                     <li className="sidebar-nav-item" key={key}>
//                         <Dropdown>
//                             <Dropdown.Toggle id={`${key}-dropdown`} className="sidebar-dropdown-toggle" onClick={() => toggleDropdown(key)>
//                                 {menuData[key].title}
//                             </Dropdown.Toggle>
//                             <Dropdown.Menu>
//                                 {menuData[key].sections.map((section, index) => (
//                                     <div key={index}>
//                                         {section.header && <Dropdown.Header>{section.header}</Dropdown.Header>}
//                                         <Dropdown.Item
//                                             as={NavLink}
//                                             to={menuData[key].sections[0].link}
//                                             key={0}
//                                             onClick={onClose}
//                                         >
//                                             {menuData[key].title}
//                                         </Dropdown.Item>
//                                         {section.items.map((item, idx) => (
//                                             <Dropdown.Item
//                                                 as={NavLink}
//                                                 to={`/Items?${key === 'allDropdown' ? `sex=${item.id}` : `category=${key}&sex=${item.id}`}`}
//                                                 key={idx}
//                                                 onClick={onClose}
//                                             >
//                                                 {item.name}
//                                             </Dropdown.Item>
//                                         ))}
//                                     </div>
//                                 ))}
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </li>
//                 ))}
//                 {user ? (
//                     <>
//                         <li className="sidebar-nav-item">
//                             <Dropdown>
//                                 <Dropdown.Toggle id="sidebar-user-dropdown" className="sidebar-btn">
//                                     {user.ProfileImage ? (
//                                         <img src={user.ProfileImage} alt="User" className="sidebar-user-photo" />
//                                     ) : (
//                                         <FaUserCircle />
//                                     )}
//                                     {user.UserName}
//                                 </Dropdown.Toggle>
//                                 <Dropdown.Menu>
//                                     <Dropdown.Item href="/userDetails/Submitted">
//                                         <FaBox /> My Items
//                                     </Dropdown.Item>
//                                     <Dropdown.Item href="/accountDetails">
//                                         <FaUserCircle /> My Profile
//                                     </Dropdown.Item>
//                                     <Dropdown.Item href="/" onClick={handleLogout}>
//                                         <FaSignOutAlt /> Logout
//                                     </Dropdown.Item>
//                                 </Dropdown.Menu>
//                             </Dropdown>
//                         </li>
//                     </>
//                 ) : (
//                     <li className="sidebar-nav-item">
//                         <button className="sidebar-nav-link btn" onClick={() => { setIsModalOpen(true); onClose(); }}>
//                             <FaUserCircle /> Login
//                         </button>
//                     </li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default MobileSidebar;
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaUserCircle, FaSignOutAlt, FaBox } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import './MobileSidebar.css';

const MobileSidebar = ({ isOpen, onClose, user, handleLogout, setIsModalOpen, menuData }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (key) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    return (
        <div id="unique-mobile-sidebar">
            <div className={`mobsidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <ul className="sidebar-nav">
                    {user && user.RoleID === 1 ? (
                        <>
                            <li className="sidebar-nav-item">
                                <NavLink to="/sell" className="sidebar-nav-link" onClick={onClose}>
                                    <button className="btn btn-common">SELL NOW</button>
                                </NavLink>
                            </li>
                            <li className="sidebar-nav-item">
                                <NavLink to="/ShowSellQueue" className="sidebar-nav-link" onClick={onClose}>
                                    <button className="btn btn-common">Control Panel</button>
                                </NavLink>
                            </li>
                        </>
                    ) : user && (
                        <li className="sidebar-nav-item">
                            <NavLink to="/sell" className="sidebar-nav-link" onClick={onClose}>
                                <button className="btn btn-common">SELL NOW</button>
                            </NavLink>
                        </li>
                    )}
                    <li className="sidebar-nav-item">
                        <NavLink to="/cart" className="sidebar-nav-link" onClick={onClose}>
                            <FaShoppingBag /> Bag
                        </NavLink>
                    </li>
                    <li className="sidebar-nav-item">
                        <NavLink to="/fav" className="sidebar-nav-link" onClick={onClose}>
                            <FaHeart /> Wishlist
                        </NavLink>
                    </li>
                    {Object.keys(menuData).map(key => (
                        <li className="sidebar-nav-item" key={key}>
                            <Dropdown show={openDropdown === key}>
                                <Dropdown.Toggle
                                    id={`${key}-dropdown`}
                                    className="sidebar-dropdown-toggle"
                                    onClick={() => toggleDropdown(key)}
                                >
                                    {menuData[key].title}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {menuData[key].sections.map((section, index) => (
                                        <div key={index}>
                                            {section.header && <Dropdown.Header>{section.header}</Dropdown.Header>}
                                            <Dropdown.Item
                                            as={NavLink}
                                            to={menuData[key].sections[0].link}
                                            key={0}
                                            onClick={onClose}
                                        >
                                            {menuData[key].title}
                                        </Dropdown.Item>
                                            {section.items.map((item, idx) => (
                                                <Dropdown.Item
                                                    as={NavLink}
                                                    to={`/Items?${key === 'allDropdown' ? `sex=${item.id}` : `category=${key}&sex=${item.id}`}`}
                                                    key={idx}
                                                    onClick={onClose}
                                                >
                                                    {item.name}
                                                </Dropdown.Item>
                                            ))}
                                        </div>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    ))}
                    {user ? (
                        <>
                            <li className="sidebar-nav-item">
                                <Dropdown show={openDropdown === 'user'}>
                                    <Dropdown.Toggle
                                        id="sidebar-user-dropdown"
                                        className="sidebar-btn"
                                        onClick={() => toggleDropdown('user')}
                                    >
                                        {user.ProfileImage ? (
                                            <img src={user.ProfileImage} alt="User" className="sidebar-user-photo" />
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
                        </>
                    ) : (
                        <li className="sidebar-nav-item">
                            <button className="sidebar-nav-link btn" onClick={() => { setIsModalOpen(true); onClose(); }}>
                                <FaUserCircle /> Login
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MobileSidebar;
