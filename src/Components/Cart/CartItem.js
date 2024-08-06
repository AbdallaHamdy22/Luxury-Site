import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import './CartItem.css';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/RDXCart';
import axiosInstance from '../../axiosConfig/instance';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [localQuantity, setLocalQuantity] = useState(item.Quantity);
    const [imageArray, setImageArray] = useState([]);

    useEffect(() => {
        console.log(item);
        
        if (typeof item.Image === 'string') {
            setImageArray(item.Image.split(','));
        } else if (Array.isArray(item.Image)) {
            setImageArray(item.Image);
        } else {
            console.error('Image is not a string or array', item.Image);
            setImageArray([]);
        }
    }, [item]);

    const handleIncrease = async () => {
        if (item.MainQuantity > localQuantity) {
            const newQuantity = localQuantity + 1;
            setLocalQuantity(newQuantity);
            dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity }));
            await axiosInstance.post('Products/updateProductQuantity.php', {
                ProductID: item.ProductID,
                quantity: item.Quantity-1
            });
        } else {
            alert(`Only ${item.MainQuantity} items available in stock`);
        }
    };

    const handleDecrease = async () => {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity }));
            await axiosInstance.post('Products/updateProductQuantity.php', {
                ProductID: item.ProductID,
                quantity: item.Quantity+1
            });
        }
    };

    const handleRemove = async () => {
        dispatch(removeFromCart({ ProductID: item.ProductID }));
        await axiosInstance.post('Products/updateProductQuantity.php', {
            ProductID: item.ProductID,
            quantity: item.Quantity + localQuantity
        });
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
                <Button variant="outline-danger" onClick={handleRemove} className="remove-button">
                    Remove
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;
