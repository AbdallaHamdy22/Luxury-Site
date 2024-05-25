import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './Rxd';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;