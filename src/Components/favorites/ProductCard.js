import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../Redux/RDXCart';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const isInCart = cart.some(item => item.ProductID === product.ProductID);

    const handleCartClick = () => {
        if (isInCart) {
            dispatch(removeFromCart({ id: product.ProductID }));
        } else {
            dispatch(addToCart(product));
        }
    };

    return (
        <div className="product-card">
            <Link to={`/ItemDetails/${product.ProductID}`} className="product-card-link">
                <img src={product.Image} alt={product.Name} className="product-image"/>
                <div className="product-details">
                    <h4>{product.Name}</h4>
                    <p className="price">${product.Price.toFixed(2)}</p>
                </div>
            </Link>
            <button
                onClick={handleCartClick}
                className={`btn ${isInCart ? 'btn-danger' : 'btn-primary'} mt-2 w-100`}
            >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductCard;
