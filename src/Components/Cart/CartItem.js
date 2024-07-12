import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './CartItem.css';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        onQuantityChange(item, quantity);
    }, [quantity]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
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
                <Form.Control 
                    type="number" 
                    value={quantity} 
                    onChange={handleQuantityChange} 
                    min="1" 
                />
            </Col>
            <Col className='col4'>
                <span>${(parseFloat(item.Price) * quantity).toFixed(2)}</span>
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
