import React, { useState, useEffect } from 'react';
import './Category.css';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost/dashboard/LUXURY-SITE/Categoire/')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="container category-section">
      <h4>SHOP BY CATEGORIES</h4>
      <br />
      <div className="row">
        {categories.map(category => (
          <div key={category.CategoireID} className="col-md-4 mb-4">
            <img src={category.Image} alt={category.Name} />
            <h5>{category.Name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

