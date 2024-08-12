// import React, { useEffect, useState } from "react";

// const Submitted = ({ items, toggleItem, openItem }) => {
//   const [filtereditems, setFilteredItems] = useState([]);

//   useEffect(() => {
//     let data = items.filter(item => item.Status === 'Available');
//     setFilteredItems(data)
//   }, []);
//   return (
//     <div className="items-list">
//       <div className="item">
//         <div className="item-header" onClick={() => toggleItem(0)}>
//           <h2>Item(s) to be quoted</h2>
//           <span>{openItem === 0 ? '-' : '+'}</span>
//         </div>
//         {openItem === 0 && (
//           <div className="item-content">
//             <p>We are currently evaluating your item(s). You will soon receive the estimated price range to choose your payout from. <a href="#">Know More</a></p>
//           </div>
//         )}
//       </div>
//       <div className="item">
//         <div className="item-header" onClick={() => toggleItem(1)}>
//           <h2>Proposed Prices</h2>
//           <span>{openItem === 1 ? '-' : '+'}</span>
//         </div>
//         {openItem === 1 && (
//           <div className="item-content">
//             <p>Lower the price, higher the chances of selling. Once you approve, the applicable commission will be added to it. <a href="#">Know More</a></p>
//           </div>
//         )}
//       </div>
//       <div className="item">
//         <div className="item-header" onClick={() => toggleItem(2)}>
//           <h2>Unaccepted Items</h2>
//           <span>{openItem === 2 ? '-' : '+'}</span>
//         </div>
//         {openItem === 2 && (
//           <div className="item-content">
//             <p>We regret to inform you that the following item(s) cannot be accepted.</p>
//           </div>
//         )}
//       </div>
//       <div className="item">
//         <div className="item-header" onClick={() => toggleItem(3)}>
//           <h2>Pending Pick-Up</h2>
//           <span>{openItem === 3 ? '-' : '+'}</span>
//         </div>
//         {openItem === 3 && (
//           <div className="item-content">
//             <p>The item(s) are yet to be received by The Luxury Closet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Submitted;

import React from "react";

const Submitted = ({ items, toggleItem, openItem }) => {

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

export default Submitted;
