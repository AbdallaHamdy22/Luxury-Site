import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.Image} alt={product.Name} className="product-image"/>
            <div className="product-details">
                <h4>{product.Name}</h4>
                <p className="price">${product.Price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
