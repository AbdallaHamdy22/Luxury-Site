import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../Redux/RDXCart';
import { removeFromFavorites } from '../Redux/RDXFav';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const isInCart = cart.some(item => item.ProductID === product.ProductID);

    const handleCartClick = () => {
        if (isInCart) {
            dispatch(removeFromCart({ ProductID: product.ProductID }));
        } else {
            dispatch(addToCart({ ...product, Quantity: 1 }));
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
            <div className="button-group">
                <button
                    onClick={handleCartClick}
                    className={`btn ${isInCart ? 'btn-danger' : 'btn-primary'}`}
                >
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <button
                    onClick={() => dispatch(removeFromFavorites({ id: product.ProductID }))}
                    className="btn btn-danger"
                >
                    Remove from Favorites
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
