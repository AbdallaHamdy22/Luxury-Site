import React, { useState, useEffect } from 'react';
import axiosInstance from './../../axiosConfig/instance';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance.get('Categoire/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="container category-section">
      <h4>SHOP BY CATEGORIES</h4>
      <div className="row d-flex justify-content-center">
        {categories.map(category => (
          <div key={category.CategoireID} className="col-12 col-sm-6 col-md-4 mb-4 text-center">
            <Link className='link' to={`/Items?category=${category.CategoireID}`}>
              <img src={category.Image} alt={category.Name} />
              <h5>{category.Name}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
