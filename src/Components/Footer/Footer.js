import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';
import axiosInstance from './../../axiosConfig/instance';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const social = [
    { icon: 'facebook-f', link: 'https://www.facebook.com' },
    { icon: 'instagram', link: 'https://www.instagram.com' },
    { icon: 'whatsapp', link: 'https://wa.me/+971582150140' },
  ];

  useEffect(() => {
    axiosInstance.get('Categoire/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    axiosInstance.get('Brand/')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Top Categories</h5>
            <ul className="list-unstyled">
              {categories.map(category => (
                <li key={category.CategoireID}><a href={`/Items?category=${category.CategoireID}`}>{category.Name}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Top Brands</h5>
            <ul className="list-unstyled">
              {brands.slice(0, 8).map(brand => (
                <li key={brand.BrandID}><a href={`/Items?brand=${brand.BrandID}`}>{brand.Name}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <h5>About The Royal Luxury</h5>
            <ul className="list-unstyled">
              {['About Us', 'Privacy Policy', 'Terms & Conditions', 'FAQs', 'Sell Now'].map(item => {
                const href = item === 'Sell Now' ? '/sell' : '/';
                return (
                  <li key={item}><a href={href}>{item}</a></li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              {['Contact Us', 'FAQs', 'Student & Youth Discount', 'Essential Worker Discount'].map(item => (
                <li key={item}><a href="/">{item}</a></li>
              ))}
            </ul>
            <h5>We Are Here To Help You!</h5>
            <ul className="list-unstyled">
              <li><a href="tel:+971582150140">+971 58 215 0140</a></li>
              <li>Monday to Sunday</li>
              <li>9 am to 9 pm (GST)</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          {social.map(app => (
            <a href={app.link} key={app.icon} target="_blank" rel="noopener noreferrer">
              <i className={`fab fa-${app.icon} icon-spacing`}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
