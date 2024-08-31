import React from "react";
import './userDetails.css';

const Available = ({ items, toggleItem, openItem }) => {
  return (
    <div className="luxury-items-list">
      {items.length > 0 ? (
        items.map((item, index) => {
          const formattedPrice = new Intl.NumberFormat().format(item.Price);
          const images = item.Image.split(",");
          return (
            <div className="luxury-item" key={item.ProductID}>
              <div className="luxury-item-header" onClick={() => toggleItem(index)}>
                <h2>{item.Name}</h2>
                <span>{openItem === index ? '-' : '+'}</span>
              </div>
              {openItem === index && (
                <div className="luxury-item-content">
                  <img src={images[0]} alt={item.ProductName} className="luxury-item-image" />
                  <p><strong>Product ID:</strong> {item.ProductID}</p>
                  <p><strong>Description:</strong> {item.Description}</p>
                  <p><strong>Price:</strong> {formattedPrice} AED</p>
                </div>
              )}
            </div>
          )
        })
      ) : (
        <p>No Available items found.</p>
      )}
    </div>
  );
};

export default Available;
