import React from 'react';
import Navbar from './Nav';
import DropdownMenus from './DropDownMenu';
const Header = ({ user }) => (
  <>
    <Navbar user={user} />
    <DropdownMenus/>
  </>
);

export default Header;
