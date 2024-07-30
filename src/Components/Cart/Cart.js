import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/RDXCart';
import CartItem from './CartItem';
import { Row, Col, Button } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        setQuantities(cart.reduce((acc, item) => {
            acc[item.ProductID] = item.Quantity;
            return acc;
        }, {}));
    }, [cart]);

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > item.Quantity) {
            alert(`غير مسموح، الكمية المتاحة هي ${item.Quantity}`);
            return;
        }

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
            <h2 className="cart-title">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty</p>
            ) : (
                <div>
                    <Row className="cart-header">
                        <Col xs={12} md={5} className='col-item-info'><h4>Product</h4></Col>
                        <Col xs={4} md={2} className='col-item-price'><h4>Price</h4></Col>
                        <Col xs={4} md={3} className='col-item-quantity'><h4>Quantity</h4></Col>
                        <Col xs={4} md={2} className='col-item-total'><h4>Total</h4></Col>
                    </Row>
                    {cart.map((item) => (
                        <CartItem
                            key={item.ProductID}
                            item={item}
                            quantity={quantities[item.ProductID]}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))}
                    <Row className="cart-total">
                        <Col xs={12} md={5} className='col-item-info'><h3>Subtotal</h3></Col>
                        <Col xs={4} md={2} className='col-item-price'></Col>
                        <Col xs={4} md={3} className='col-item-quantity'></Col>
                        <Col xs={4} md={2} className='col-item-total'><h3>{subtotal.toFixed(2)} AED</h3></Col>
                    </Row>
                    <Button variant="primary" className="checkout-button mt-3">Proceed to Checkout</Button>
                </div>
            )}
        </div>
    );
};

export default Cart;
