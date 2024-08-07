import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/ItemDetails/${product.ProductID}`} className="product-card-link">
            <div className="product-card">
                <img src={product.Image} alt={product.Name} className="product-image"/>
                <div className="product-details">
                    <h4>{product.Name}</h4>
                    <p className="price">${product.Price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
