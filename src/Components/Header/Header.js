import React from 'react';
import Navbar from './Nav';
import DropdownMenus from './DropDownMenu';
import './Header.css';
const Header = ({ user }) => (
  <>
    <Navbar user={user} />
    <DropdownMenus user={user} />
  </>
);

export default Header;
