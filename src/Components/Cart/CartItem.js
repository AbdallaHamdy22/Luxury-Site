import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import './CartItem.css';

const CartItem = ({ item, quantity, onQuantityChange, onRemove }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);
    const [imageArray, setImageArray] = useState([]);

    useEffect(() => {
        setLocalQuantity(quantity);
        if (typeof item.Image === 'string') {
            setImageArray(item.Image.split(','));
        } else if (Array.isArray(item.Image)) {
            setImageArray(item.Image);
        } else {
            console.error('Image is not a string or array', item.Image);
            setImageArray([]);
        }
    }, [quantity, item]);

    const handleIncrease = () => {
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        onQuantityChange(item, newQuantity);
    };

    const handleDecrease = () => {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            onQuantityChange(item, newQuantity);
        }
    };

    return (
        <Row className="cart-item align-items-center">
            <Col xs={12} md={5} className="col-item-info">
                <div className="item-info">
                    <Image src={imageArray[0]} alt={item.Name} className="item-image" rounded />
                    <span className="item-name">{item.Name}</span>
                </div>
            </Col>
            <Col xs={4} md={2} className="col-item-price">
                <span className="item-price">{parseFloat(item.Price).toFixed(2)} AED</span>
            </Col>
            <Col xs={4} md={3} className="col-item-quantity">
                <div className="quantity-control">
                    <Button variant="outline-secondary" className="quantity-button" onClick={handleDecrease}>-</Button>
                    <span className="quantity">{localQuantity}</span>
                    <Button variant="outline-secondary" className="quantity-button" onClick={handleIncrease}>+</Button>
                </div>
            </Col>
            <Col xs={4} md={2} className="col-item-total">
                <span className="item-total">{(parseFloat(item.Price) * localQuantity).toFixed(2)} AED</span>
                <Button variant="outline-danger" onClick={() => onRemove(item)} className="remove-button">
                    Remove
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;
