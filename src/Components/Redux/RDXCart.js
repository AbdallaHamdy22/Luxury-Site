import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.ProductID === action.payload.ProductID);
            if (existingItem) {
                existingItem.Quantity += 1;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.ProductID !== action.payload.ProductID);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            state.items = state.items.map(item =>
                item.ProductID === action.payload.ProductID
                    ? { ...item, Quantity: action.payload.Quantity, MainQuantity: action.payload.MainQuantity }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateMainQuantity: (state, action) => {
            state.items = state.items.map(item =>
                item.ProductID === action.payload.ProductID
                    ? { ...item, MainQuantity: action.payload.MainQuantity }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items));
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, updateMainQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
