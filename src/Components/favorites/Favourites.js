import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../Redux/RDXFav';
import ProductCard from '../Card/Card';

const Favourites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.items);
    console.log(favorites.length);
    return (
        <div>
            {favorites.length > 0 ? (
                favorites.map(product => (
                    <div key={product.ProductID}>
                        <h4>{product.Name}</h4>
                        <ProductCard key={product.ProductID} product={product} />
                        <button onClick={() => dispatch(removeFromFavorites({ id: product.ProductID }))} className='btn btn-danger'>
                            Remove from Favorites
                        </button>
                    </div> 
                ))
            ) : (
                <p>No favorites yet.</p>
            )}
        </div>
    );
};

export default Favourites;
