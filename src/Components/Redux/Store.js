import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './RDXFav';
import cartReducer from './RDXCart';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export default store;
