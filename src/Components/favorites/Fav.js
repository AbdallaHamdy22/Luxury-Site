// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromFavorites } from '../Redux/RDXFav';
// import ProductCard from '../Card/Card';

// const FavoritesComponent = () => {
//     const dispatch = useDispatch();
//     const favorites = useSelector(state => state.favorites.items);
//     console.log(favorites);
//     const handleRemoveFromFavorites = (product) => {
//         dispatch(removeFromFavorites(product));
//     };
    
//     const isFavorite = (id) => {
//       return Array.isArray(favorites) && favorites.some(fav => fav.id === id);
//     };

//     return (
//         <div>
//             {favorites.map(product => (
//                 <div key={product.id}>
//                 <h4>{product.Name}</h4>
//                   <ProductCard key={product.ProductID} product={product} />
//                 <button onClick={() => handleRemoveFromFavorites(product)}>
//                   {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
//                 </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FavoritesComponent;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../Redux/RDXFav';
import ProductCard from '../Card/Card';

const FavoritesComponent = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.items);
    console.log(favorites);

    const handleRemoveFromFavorites = (product) => {
        dispatch(removeFromFavorites(product));
    };

    const isFavorite = (id) => {
      return Array.isArray(favorites) && favorites.some(fav => fav.id === id);
    };

    return (
        <div>
            {Array.isArray(favorites) && favorites.length > 0 ? (
                favorites.map(product => (
                    <div key={product.id}>
                        <h4>{product.Name}</h4>
                        <ProductCard key={product.ProductID} product={product} />
                        <button onClick={() => handleRemoveFromFavorites(product)}>
                            {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                ))
            ) : (
                <p>No favorites yet.</p>
            )}
        </div>
    );
};

export default FavoritesComponent;
