import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import CartItem from './CartItem';
import './Cart.css';
import axiosInstance from '../../axiosConfig/instance';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const [subtotal, setSubtotal] = useState(0);
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const cartItemDetails = cart.map(cartItem => {
            const product = items.find(item => item.ProductID === cartItem.ProductID);
            return product ? { ...product, Quantity: cartItem.Quantity } : null;
        }).filter(item => item !== null);

        const total = cartItemDetails.reduce((acc, item) => acc + item.Price * item.Quantity, 0);

        setCartItems(cartItemDetails);
        setSubtotal(total);
    }, [cart, items]);

    const fetchData = async () => {
        try {
            const productResponse = await axiosInstance.get('Products/getproduct.php');
            const productData = productResponse.data;
            setItems(productData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="shopping-cart container mt-5 p-5">
            <h2 className="cart-title mb-4">Shopping Cart</h2>
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
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.ProductID}
                            item={item}
                        />
                    ))}
                    <Row className="cart-total mt-4">
                        <Col xs={12} md={5} className='col-item-info'><h3>Subtotal</h3></Col>
                        <Col xs={4} md={2} className='col-item-price'></Col>
                        <Col xs={4} md={3} className='col-item-quantity'></Col>
                        <Col xs={4} md={2} className='col-item-total'><h3>{subtotal.toFixed(2)} AED</h3></Col>
                    </Row>
                    <NavLink 
                        to={{
                            pathname: '/buynow',
                            state: { items: cartItems }
                        }}>
                        <Button className="checkout-button mt-5">Proceed to Checkout</Button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Cart;
