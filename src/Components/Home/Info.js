import React from 'react';

const InformationSection = () => (
  <div className="container mt-5 text-center">
    <h4>You Can Always Count On Us</h4>
    <div className="row mt-4">
      {[
        { icon: 'fas fa-gem', title: 'Unique Luxury Pieces', description: 'Extensive luxury collection where each item is unique & high on fashion.' },
        { icon: 'fas fa-tags', title: 'Affordable Luxury', description: 'Stellar luxury pieces at irresistible discounts & with installment purchase options.' },
        { icon: 'fas fa-shield-alt', title: 'Trusted Platform', description: 'Reliable and secure platform with 25,000+ creations having lifetime authenticity guarantee.' },
        { icon: 'fas fa-shipping-fast', title: 'Worldwide Delivery & Returns', description: 'What you see is what you get, else money back.' },
      ].map(info => (
        <div className="col-12 col-md-6 col-lg-3 mb-4" key={info.title}>
          <i className={`${info.icon} fa-2x`}></i>
          <h5>{info.title}</h5>
          <p>{info.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default InformationSection;
