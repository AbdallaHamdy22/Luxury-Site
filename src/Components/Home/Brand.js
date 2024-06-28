import React, { useState, useEffect } from 'react';
import './Brand.css';

const BrandSection = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('http://localhost/dashboard/LUXURY-SITE/Brand/')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  return (
    <div className="container brand-section">
      <h4>SHOP BY BRANDS</h4>
      <br />
      <div className="row d-flex justify-content-center">
        {brands.map(brand => (
          <div className="col-md-1 mb-4 text-center" key={brand.BrandID}>
            <img src={brand.Image} alt={brand.Name} />
            <h5>{brand.Name.toUpperCase()}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
