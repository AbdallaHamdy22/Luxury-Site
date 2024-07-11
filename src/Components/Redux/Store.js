import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './RDXCart';
import favoritesReducer from './RDXFav';

const store = configureStore({ 
    reducer: {
        cart: cartReducer,
        favorites: favoritesReducer,
    },
});

export default store;
