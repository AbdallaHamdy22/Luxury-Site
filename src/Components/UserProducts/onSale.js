import React from "react";
import './userDetails.css';

const OnSale = ({ items, toggleItem, openItem }) => {
  return (
    <div className="luxury-items-list">
      {items.length > 0 ? (
        items.map((item, index) => {
          const formattedPrice = new Intl.NumberFormat().format(item.Price);
          return(
            <div className="luxury-item" key={item.ProductID}>
              <div className="luxury-item-header" onClick={() => toggleItem(index)}>
                <h2>{item.Name}</h2>
                <span>{openItem === index ? '-' : '+'}</span>
              </div>
              {openItem === index && (
                <div className="luxury-item-content">
                  <p><strong>Product ID:</strong> {item.ProductID}</p>
                  <p><strong>Description:</strong> {item.Description}</p>
                  <p><strong>Price:</strong> {formattedPrice} AED</p>
                  <p><strong>Sale percentage:</strong> {item.OfferPrice}%</p>
                </div>
              )}
            </div>
          )
        })
      ) : (
        <p>No items on sale found.</p>
      )}
    </div>
  );
};

export default OnSale;
