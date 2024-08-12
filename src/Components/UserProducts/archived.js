import React from "react";

const Archived = ({ items, toggleItem, openItem }) => {
  return (
    <div className="items-list">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div className="item" key={item.ProductID}>
            <div className="item-header" onClick={() => toggleItem(index)}>
              <h2>{item.Name}</h2>
              <span>{openItem === index ? '-' : '+'}</span>
            </div>
            {openItem === index && (
              <div className="item-content">
                <p>{item.description}</p>
                <p>Price: {item.Price} AED</p>
                <p>Status: {item.Status}</p>
                <p>Category: {item.Categoire_ID}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No submitted items found.</p>
      )}
    </div>
  );
};

export default Archived;
