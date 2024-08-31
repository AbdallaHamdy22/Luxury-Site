import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/RDXFav';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './Card.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const isFavorite = (id) => favorites.some((item) => item.ProductID === id);

    const handleToggleFavorites = (id) => {
        if (isFavorite(id)) {
            dispatch(removeFromFavorites({ id }));
        } else {
            dispatch(addToFavorites(product));
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

    const changePriceInput = (price) => {
        const formattedPrice = new Intl.NumberFormat().format(price);
        return formattedPrice;
    }

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

                {isRecentlyAdded(product.ProductionYear) && (
                    <div className="badge-container newly-added">
                        <span className="badge recently-added">Newly added</span>
                    </div>
                )}

                {product.Quantity === 0 && (
                    <div className="badge-container sold-out">
                        <span className="badge sold-out">Sold Out</span>
                    </div>
                )}

                <Link to={`/Items/${product.ProductID}`} className="card-link">
                    {imageUrls.length > 0 ? (
                        <img src={imageUrls[0]} className="card-img-top" alt={product.Name} />
                    ) : (
                        <div className="placeholder-image">No Image Available</div>
                    )}
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.Name}</h5>
                    <p className="card-text">{product.Description}</p>
                    <div className="field-value">
                        <span>Price:</span>
                        <span>{hasOffer ? (
                            <>
                                <del>{changePriceInput(product.Price)}</del> {changePriceInput(discountPrice)}
                            </>
                        ) : (
                            changePriceInput(product.Price)
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