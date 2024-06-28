import React, { useEffect, useState } from 'react';
import DropdownMenu from './DropDown';
import './DropDown.css';

const DropdownMenus = () => {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/dashboard/LUXURY-SITE/Sex/') // Replace with the actual URL to your PHP endpoint
      .then(response => response.json())
      .then(data => {
        setMenuData(data);
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
      </nav>
    </div>
  );
};

export default DropdownMenus;
