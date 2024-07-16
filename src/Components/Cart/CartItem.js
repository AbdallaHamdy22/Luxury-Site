import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './CartItem.css';

const CartItem = ({ item, quantity, onQuantityChange, onRemove }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

    const handleIncrease = () => {
        const newQuantity = localQuantity + 1;
        onQuantityChange(item, newQuantity);
    };

    const handleDecrease = () => {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            onQuantityChange(item, newQuantity);
        }
    };

    return (
        <Row className="cart-item">
            <Col className='col1'>
                <div className="item-info">
                    <img src={item.Image} alt={item.Name} className="item-image" />
                    <span>{item.Name}</span>
                </div>
            </Col>
            <Col className='col2'>
                <span>${parseFloat(item.Price).toFixed(2)}</span>
            </Col>
            <Col className='col3'>
                <div className="quantity-control">
                    <Button className="quantity-button" onClick={handleDecrease}>-</Button>
                    <span className="quantity">{localQuantity}</span>
                    <Button className="quantity-button" onClick={handleIncrease}>+</Button>
                </div>
            </Col>
            <Col className='col4'>
                <span>${(parseFloat(item.Price) * localQuantity).toFixed(2)}</span>
                <Button
                    variant="danger"
                    onClick={() => onRemove(item)}
                    className="remove-button"
                >
                    Remove
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;
