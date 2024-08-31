import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './RDXCart';
import favoritesReducer from './RDXFav';
import userReducer from './RDXUser';

const store = configureStore({ 
    reducer: {
        cart: cartReducer,
        favorites: favoritesReducer,
        user: userReducer,
    },
});

export default store;
