import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, ListGroup, Image, Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './Items_details.css';
import axiosInstance from '../../axiosConfig/instance';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { addToCart, removeFromCart, updateQuantity } from '../Redux/RDXCart'; 
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = ({ user }) => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [similarProducts, setSimilarProducts] = useState([]);
    const dispatch = useDispatch(); 
    const cart = useSelector((state) => state.cart.items);
    const isInCart = cart.some((item) => item.ProductID === Number(id));

    useEffect(() => {
        axiosInstance.get(`Products/getProductDetails.php?ProductID=${id}`)
            .then(response => {
                let data = response.data;
                if (data.ProductID) {
                    setItem(data);
                    axiosInstance.get('Products/getitems.php')
                        .then(response => {
                            const products = response.data;
                            const similar = products.filter(product =>
                                (product.CategoireID === data.CategoireID || product.BrandID === data.BrandID) &&
                                product.ProductID !== Number(id)
                            );
                            setSimilarProducts(similar);
                        })
                        .catch(error => console.error('Error fetching similar products:', error));
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
        if (isInCart) {
            const cartItem = cart.find(item => item.ProductID === Number(id));
            if (cartItem) {
                dispatch(removeFromCart({ id: cartItem.ProductID }));
                setQuantity(0);
            }
        } else {
            setQuantity(1);
            dispatch(addToCart({ ...item, Quantity: quantity }));
        }
    };

    const handleSuccessPayment = (details, data) => {
        const orderData = new FormData();
        orderData.append('ProductID', item.ProductID);
        orderData.append('Quantity', quantity);
        orderData.append('Price', item.Price);
        orderData.append('UserID', user.ID);
        orderData.append('PaymentID', data.orderID);

        axiosInstance.post('Orders/addOrder.php', orderData)
            .then(response => {
                if (response.data.status === 'success') {
                    alert('Order placed successfully!');
                } else {
                    console.error('Error placing order:', response.data);
                    alert('Failed to place order: ' + response.data.message);
                }
            })
            .catch(error => {
                console.error('Error placing order:', error);
                alert('An error occurred while placing the order.');
            });
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
                        <Image src={item.Image} fluid className="main-product-image" />
                    )}
                </Col>
                <Col md={6}>
                    <h1>{item.Name}</h1>
                    <p className="price">Price: <strong>{item.Price} AED</strong></p>

                    {user ? (
                        <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
                            <PayPalButtons
                                amount={item.Price * quantity}
                                onSuccess={(details, data) => handleSuccessPayment(details, data)}
                            />
                        </PayPalScriptProvider>
                    ) : (
                        <Button variant="primary" className="mb-3" onClick={() => alert("Please log in to buy this product")}>Buy Now</Button>
                    )}

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
                                <ListGroup.Item><strong>Bracelet Material:</strong> {item.BraceletMaterial || 'N/A'}</ListGroup.Item>
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
