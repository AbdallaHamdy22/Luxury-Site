import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instance';

const BrandSection = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axiosInstance.get('Brand/')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  return (
    <div className="container brand-section">
      <h4>SHOP BY BRANDS</h4>
      <div className="brand-container">
        {brands.map(brand => (
          <div key={brand.BrandID}>
            <img src={brand.Image} alt={brand.Name} />
            <h5>{brand.Name.toUpperCase()}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
