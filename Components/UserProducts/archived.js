import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/instance";
import './userDetails.css';
import { useSelector } from "react-redux";

const Archived = ({ toggleItem, openItem }) => {
  const [items, setItems] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchArchivedItems = async () => {
      try {
        const response = await axiosInstance.get('Products/getArchivedProducts.php');
        const data = response.data.filter(item => item.UserID === user.UserID);
        setItems(data);
      } catch (error) {
        console.error('Error fetching archived products:', error);
      }
    };

    fetchArchivedItems();
  }, []);

  return (
    <div className="luxury-items-list">
      {items.length > 0 ? (
        items.map((item, index) => {
          const formattedPrice = new Intl.NumberFormat().format(item.Price);
          return (
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
                  <p><strong>Status:</strong> {item.Status}</p>
                  <p><strong>Production Year:</strong> {item.ProductionYear}</p>
                </div>
              )}
            </div>
          )
        })
      ) : (
        <p>No archived items found.</p>
      )}
    </div>
  );
};

export default Archived;
