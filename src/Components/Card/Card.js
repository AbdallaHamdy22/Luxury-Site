import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/RDXFav';
import { addToCart, removeFromCart } from '../Redux/RDXCart';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './Card.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const cart = useSelector((state) => state.cart.items);

    const isFavorite = (id) => favorites.some((item) => item.ProductID === id);
    const isInCart = (id) => cart.some((item) => item.ProductID === id);

    const handleToggleFavorites = (id) => {
        if (isFavorite(id)) {
            dispatch(removeFromFavorites({ id }));
        } else {
            dispatch(addToFavorites(product));
        }
    };

    const handleToggleCart = (id) => {
        if (isInCart(id)) {
            dispatch(removeFromCart({ id }));
        } else {
            dispatch(addToCart(product));
        }
    };

    const isRecentlyAdded = (addedDate) => {
        const currentDate = dayjs();
        const addedDateDayjs = dayjs(addedDate);
        return currentDate.diff(addedDateDayjs, 'day') <= 3;
    };

    const calculateDiscountPrice = (price, offer) => {
        if (offer > 0) {
            const discount = price * (offer / 100);
            return price - discount;
        }
        return null;
    };

    const discountPrice = calculateDiscountPrice(product.Price, product.OfferPrice);
    const hasOffer = product.OfferPrice && product.OfferPrice > 0;

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <div className="card-icons">
                    <button
                        onClick={() => handleToggleFavorites(product.ProductID)}
                        className="favorite-button"
                    >
                        <FaStar color={isFavorite(product.ProductID) ? "gold" : "white"} />
                    </button>
                    <button
                        onClick={() => handleToggleCart(product.ProductID)}
                        className="cart-button"
                    >
                        <FaShoppingCart color={isInCart(product.ProductID) ? "blue" : "white"} />
                    </button>
                </div>
                <Link to={`/ItemDetails/${product.ProductID}`} style={{ textDecoration: 'none' }}>
                    {product.Image ? (
                        <img src={product.Image} className="card-img-top" alt={product.Name} />
                    ) : (
                        <img src="/path/to/default/image.png" className="card-img-top" alt="Default" />
                    )}
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.Name}</h5>
                    <p className="card-text text-muted">{product.Description}</p>
                    {hasOffer ? (
                        <>
                            <i><p className="card-text text-danger">Discount {product.OfferPrice} %</p></i>
                            <p className="card-text text-danger">
                                <del>Price: {product.Price} AED</del> {discountPrice} AED
                            </p>
                        </>
                    ) : (
                        <p className="card-text text-muted">Price: {product.Price} AED</p>
                    )}
                    {isRecentlyAdded(product.date) && (
                        <span className="badge">Recently added</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
