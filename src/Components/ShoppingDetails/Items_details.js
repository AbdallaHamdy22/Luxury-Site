import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, ListGroup, Image, Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './Items_details.css';
import axiosInstance from '../../axiosConfig/instance';
import { addToCart, removeFromCart, updateQuantity } from '../Redux/RDXCart'; 
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = ({ user }) => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch(); 
    const cart = useSelector((state) => state.cart.items);
    const isInCart = cart.some((item) => item.ProductID === Number(id));

    useEffect(() => {
        axiosInstance.get(`Products/getProductDetails.php?ProductID=${id}`)
            .then(response => {
                let data = response.data;
                console.log(data);
                if (data.ProductID) {
                    setItem(data);
                } else {
                    console.error('Item not found');
                }
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    useEffect(() => {
        const cartItem = cart.find(item => item.ProductID === Number(id));
        if (cartItem) {
            setQuantity(cartItem.Quantity);
        }
    }, [cart, id]);

    const handleToggleCart = () => {
        if (!user) {
            alert("Please log in to buy this product")
        }
        else {
            
            if (isInCart) {
                const cartItem = cart.find(item => item.ProductID === Number(id));
                if (cartItem) {
                dispatch(removeFromCart({ id: cartItem.ProductID }));
                setQuantity(1);
            }
        } else {
            setQuantity(1);
            dispatch(addToCart({ ...item, Quantity: quantity }));
        }
    }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            if (isInCart) {
                dispatch(updateQuantity({ id: item.ProductID, amount: quantity - 1 }));
            }
        }
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        if (isInCart) {
            dispatch(updateQuantity({ id: item.ProductID, amount: quantity + 1 }));
        }
    };

    return (
        <Container className="product-detail-container mt-4">
            <Breadcrumb>
                <Breadcrumb.Item href="/" style={{ textDecoration: 'none' }}>Home</Breadcrumb.Item>        
            </Breadcrumb>

            <Row>
                <Col md={6}>
                    {item.Image && (
                        <Image src={item.Image[0]} fluid className="main-product-image" />
                    )}
                </Col>
                <Col md={6}>
                    <h1>{item.Name}</h1>
                    <p className="price">Price: <strong>{item.Price} AED</strong></p>
                    <div className="quantity-control">
                        <Button className="quantity-button" onClick={handleDecrease}>-</Button>
                        <span className="quantity">{quantity}</span>
                        <Button className="quantity-button" onClick={handleIncrease}>+</Button>

                        <Button variant="secondary" className="mb-3 ml-2" onClick={() => handleToggleCart()}>
                            {isInCart ? 'Remove from Bag' : 'Add to Bag'}
                        </Button>
                    </div>

                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Overview</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item><strong>Gender:</strong> {item.SexName}</ListGroup.Item>
                                <ListGroup.Item><strong>Production Year:</strong> {item.ProductionYear || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Description:</strong> {item.Description || 'N/A'}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
