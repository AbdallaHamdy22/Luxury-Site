import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../Redux/RDXFav';
import ProductCard from './ProductCard';
import './Fav.css';

const Favourites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.items);

    return (
        <div className="favourites-container container mt-4">
            <h2>Your Favourites</h2>
            {favorites.length > 0 ? (
                <div className="card-container">
                    {favorites.map(product => (
                        <div className="product-card" key={product.ProductID}>
                            <ProductCard product={product} />
                            <button
                                onClick={() => dispatch(removeFromFavorites({ id: product.ProductID }))}
                                className="btn btn-danger mt-2 w-100"
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-favorites">You have no favorite products yet.</p>
            )}
        </div>
    );
};

export default Favourites;
