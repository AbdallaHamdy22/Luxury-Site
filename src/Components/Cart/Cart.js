import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../Redux/RDXCart';
import ProductCard from '../Card/Card';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="row">
                    {cart.map((item) => (
                        <div key={item.ProductID} >
                            <ProductCard key={item.ProductID} product={item} />
                            <button onClick={() => dispatch(removeFromCart({ id: item.ProductID }))} className="btn btn-danger">
                                Remove From Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
