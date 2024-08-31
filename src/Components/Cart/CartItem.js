import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/RDXCart';
import MessageCard from './../AlertMessage/Message';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [localQuantity, setLocalQuantity] = useState(item.Quantity);
    const [imageArray, setImageArray] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [selfMessage, setSelfMessage] = useState('');
    const [selfType, setSelfType] = useState('');

    useEffect(() => {
        if (typeof item.Image === 'string') {
            setImageArray(item.Image.split(','));
        } else if (Array.isArray(item.Image)) {
            setImageArray(item.Image);
        } else {
            console.error('Image is not a string or array', item.Image);
            setImageArray([]);
        }
    }, [item]);

    const handleIncrease = () => {
        if (item.MainQuantity > localQuantity) {
            const newQuantity = localQuantity + 1;
            setLocalQuantity(newQuantity);
            dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity, MainQuantity: item.MainQuantity - 1 }));
        } else {
            setSelfMessage(`Only ${item.MainQuantity} items available in stock`);
            setSelfType("alert");
            setShowMessage(true);
        }
    };

    const handleDecrease = () => {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity, MainQuantity: item.MainQuantity + 1 }));
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart({ ProductID: item.ProductID }));
    };

    const formattedPrice = new Intl.NumberFormat().format(item.Price);
    const formattedTotal = new Intl.NumberFormat().format(item.Price * localQuantity);

    return (
        <Row className="cart-item align-items-center py-4">
            {showMessage && (
                <MessageCard
                    type={selfType}
                    message={selfMessage}
                    onClose={() => setShowMessage(false)}
                />
            )}
            <Col xs={12} md={5} className="col-item-info">
                <div className="item-info">
                    <Image src={imageArray[0]} alt={item.Name} className="item-image" rounded />
                    <span className="item-name">{item.Name}</span>
                </div>
            </Col>
            <Col xs={4} md={2} className="col-item-price">
                <span className="item-price">{formattedPrice} AED</span>
            </Col>
            <Col xs={4} md={3} className="col-item-quantity">
                <div className="quantity-control">
                    <Button variant="outline-secondary" className="quantity-button" onClick={handleDecrease}>-</Button>
                    <span className="quantity">{localQuantity}</span>
                    <Button variant="outline-secondary" className="quantity-button" onClick={handleIncrease}>+</Button>
                </div>
            </Col>
            <Col xs={4} md={2} className="col-item-total d-flex justify-content-between">
                <span className="item-total">{formattedTotal} AED</span>
                <Button variant="outline-danger" onClick={handleRemove} className="remove-button">
                    Remove
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;
