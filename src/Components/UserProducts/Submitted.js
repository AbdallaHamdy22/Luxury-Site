import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/instance";
import { useSelector } from "react-redux";

const Submitted = ({ toggleItem, openItem }) => {
  const user = useSelector((state) => state.user.user);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('WaitingList/getQueueList.php');
        const userQueues = response.data.filter(queue => queue.UserID === user.UserID);

        const detailsPromises = userQueues.map(async (queue) => {
          const detailsResponse = await axiosInstance.get(`WaitingList/getQueueDetails.php?QueueID=${queue.QueueID}`);
          return detailsResponse.data.filter(item => item.UserID === user.UserID);
        });

        const detailsData = await Promise.all(detailsPromises);
        const flattenedItems = detailsData.flat();
        setItems(flattenedItems);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchItems();
  }, [user.UserID]);

  return (
    <div className="luxury-items-list">
      {items.length > 0 ? (
        items.map((item, index) => {
          return (
            <div className="luxury-item" key={item.ProductID}>
              <div className="luxury-item-header" onClick={() => toggleItem(index)}>
                <h2>{item.ProductName}</h2>
                <span>{openItem === index ? '-' : '+'}</span>
              </div>
              {openItem === index && (
                <div className="luxury-item-content">
                  <img src={item.Image[0]} alt={`${item.ProductName}`} className="luxury-item-image" />
                  <p><strong>Product ID:</strong> {item.ProductID}</p>
                  <p><strong>Description:</strong> {item.productDescription}</p>
                  <p><strong>Brand:</strong> {item.BrandName}</p>
                  <p><strong>Category:</strong> {item.CategoryName}</p>
                  <p><strong>Color:</strong> {item.ColorName}</p>
                  <p><strong>Quantity:</strong> {item.Quantity}</p>
                </div>
              )}
            </div>
          )
        })
      ) : (
        <p>No submitted items found.</p>
      )}
    </div>
  );
};

export default Submitted;
