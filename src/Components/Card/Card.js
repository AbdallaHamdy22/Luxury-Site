import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/RDXFav';
import { addToCart, removeFromCart } from '../Redux/RDXCart';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './Card.css';
import axiosInstance from '../../axiosConfig/instance';

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

    const handleToggleCart = async (id) => {
        if (isInCart(product.ProductID)) {
            dispatch(removeFromCart({ ProductID: id }));
            await axiosInstance.post('Products/updateProductQuantity.php', {
                ProductID: product.ProductID,
                quantity: product.Quantity + 1,
            });
        } else {
            dispatch(addToCart({ ...product, Quantity: 1 }));
            await axiosInstance.post('Products/updateProductQuantity.php', {
                ProductID: product.ProductID,
                quantity: product.Quantity - 1,
            });
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
    const hasOffer = product.OfferPrice > 0 || null;

    const imageUrls = product.Image ? product.Image.split(',') : [];

    return (
        <div className="col-md-4 mb-4">
            <div className={`card h-100 ${product.Quantity === 0 ? 'sold-out' : ''}`}>
                <button
                    onClick={() => handleToggleFavorites(product.ProductID)}
                    className={`favorite-button ${isFavorite(product.ProductID) ? 'active' : ''}`}
                >
                    <FaHeart />
                </button>
                {product.Quantity === 0 ? (
                    <div className="badge-container">
                        <span className="badge sold-out">Sold Out</span>
                    </div>
                ) : (
                    isRecentlyAdded(product.date) && (
                        <div className="badge-container">
                            <span className="badge recently-added">Newly added</span>
                        </div>
                    )
                )}
                <Link to={`/ItemDetails/${product.ProductID}`} style={{ textDecoration: 'none' }}>
                    {imageUrls.length > 0 ? (
                        <img src={imageUrls[0]} className="card-img-top" alt={product.Name} />
                    ) : (
                        <div className="placeholder-image">No Image Available</div>
                    )}
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.Name}</h5>
                    <p className="card-text text-muted">{product.Description}</p>
                    <div className="field-value">
                        <span>Price:</span>
                        <span>{hasOffer ? (
                            <>
                                <del>{product.Price}</del> {discountPrice}
                            </>
                        ) : (
                            product.Price
                        )}   AED</span>
                    </div>
                    {hasOffer && (
                        <div className="field-value">
                            <span>Discount:</span>
                            <span>{product.OfferPrice}%</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
