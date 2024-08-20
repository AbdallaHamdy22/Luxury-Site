import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import './Fav.css';

const Favourites = () => {
    const favorites = useSelector(state => state.favorites.items);

    return (
        <div className="favourites-container container mt-4">
            <h2>Your Favourites</h2>
            {favorites.length > 0 ? (
                <div className="card-container">
                    {favorites.map(product => (
                        <div  key={product.ProductID}>
                            <ProductCard product={product} />
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
