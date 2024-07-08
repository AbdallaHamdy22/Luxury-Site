import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NewArrival.css';
import axiosInstance from '../../axiosConfig/instance';

const NewArrivalsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('Products/')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching new arrivals:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container new-arrivals-section mt-5">
      <h4>NEW ARRIVALS</h4>
      <hr />
      <div className="row">
        {items.map(item => (
          <div className="col-md-3 mb-4" key={item.name}>
            <NavLink to={item.link} style={{ textDecoration: 'none' }}>
              <img src={item.img} alt={item.name} className="img-fluid equal-image" />
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsSection;
