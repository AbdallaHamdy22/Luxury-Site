import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instance';

const NewArrivalsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('Products/')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching new arrivals:', error);
        setError('Failed to load new arrivals.');
        setLoading(false);
      });
  }, []);

  const changePriceInput = (price) => {
    console.log("Raw price:", price); // Debugging log

    if (typeof price === 'string') {
      // If the price is a string, remove any non-numeric characters
      price = price.replace(/[^\d.-]/g, '');
      console.log("Processed price (string):", price);
    }

    // Parse the price to a float
    const parsedPrice = parseFloat(price);
    console.log("Parsed price:", parsedPrice);

    if (isNaN(parsedPrice)) {
      return 'N/A'; // Return 'N/A' if the price is not a valid number
    }
    
    return new Intl.NumberFormat().format(parsedPrice);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container new-arrivals-section mt-5">
      <h4>NEW ARRIVALS</h4>
      <hr />
      <div className="row">
        {items.map(item => (
          <div className="col-6 col-md-4 col-lg-3 mb-4" key={item.ProductID}>
            <NavLink to={item.link} style={{ textDecoration: 'none' }}>
              {item.img && item.img.length > 0 ? (
                <img src={item.img[0]} alt={item.Name} className="img-fluid equal-image" />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
              <h5>{item.Name}</h5>
              <p>{item.Description || 'No description available.'}</p>
              <p>{changePriceInput(item.Price)} AED</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsSection;
