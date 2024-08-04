import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.ProductID === action.payload.ProductID && item.Color === action.payload.Color);
            if (existingItem) {
                existingItem.Quantity += action.payload.Quantity;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => !(item.ProductID === action.payload.ProductID && item.Color === action.payload.Color));
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            state.items = state.items.map(item => 
                item.ProductID === action.payload.ProductID && item.Color === action.payload.Color
                    ? { ...item, Quantity: action.payload.Quantity }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
