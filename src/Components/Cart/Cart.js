import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../Redux/RDXCart';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="row">
                    {cart.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{item.id}</h5>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="btn btn-danger"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
