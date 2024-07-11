import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/RDXCart';
import CartItem from './CartItem';
import { Row, Col, Button } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState(cart.reduce((acc, item) => {
        acc[item.ProductID] = 1; // Initialize with quantity 1
        return acc;
    }, {}));

    const handleQuantityChange = (item, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item.ProductID]: newQuantity,
        }));
        dispatch(updateQuantity({ id: item.ProductID, amount: newQuantity }));
    };

    const handleRemove = (item) => {
        dispatch(removeFromCart({ id: item.ProductID }));
    };

    const subtotal = cart.reduce((acc, item) => acc + item.Price * (quantities[item.ProductID] || 1), 0);

    return (
        <div className="shopping-cart container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <Row className="cart-header">
                        <Col className='col1'><h4>Product</h4></Col>
                        <Col className='col2'><h4>Price</h4></Col>
                        <Col className='col3'><h4>Quantity</h4></Col>
                        <Col className='col4'><h4>Total</h4></Col>
                    </Row>
                    {cart.map((item) => (
                        <CartItem
                            key={item.ProductID}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))}
                    <div className="cart-summary">
                        <h2>Subtotal: ${subtotal.toFixed(2)}</h2>
                        <p>Shipping and taxes are calculated during checkout.</p>
                        <Button className="checkout-button">Checkout</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
