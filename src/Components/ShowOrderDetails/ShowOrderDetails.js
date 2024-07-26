import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import { useParams } from "react-router-dom";
import './ShowOrderDetails.css';
import Sidebar from "../SideBar/SideBar";

const ShowOrderDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [customerServicePrice, setCustomerServicePrice] = useState(0);
    const [feesPrice, setFeesPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        axiosInstance.get(`WaitingList/getQueueDetails.php?QueueID=${id}`)
            .then(response => {
                let data = response.data[0];
                setItem(data);
            })
            .catch(error => console.error('Error fetching queue details:', error));
    }, [id]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    };

    const handleApprove = () => {
        const totalUserPrice = parseFloat(item.ProductPrice) + parseFloat(customerServicePrice) + parseFloat(feesPrice) + parseFloat(shippingPrice);
        const data = new FormData();
        data.append('QueueID', id);
        data.append('UserPrice', totalUserPrice);

        axiosInstance.post('WaitingList/approveQueue.php', data)
            .then(response => {
                if (response.data.status === 'success') {
                    alert('Order approved and moved to products successfully.');
                } else {
                    alert('Failed to approve the order: ' + response.data.message);
                }
            })
            .catch(error => {
                console.error("There was an error approving the order!", error);
                alert('An error occurred while approving the order.');
            });
    };

    const handleCustomerServicePriceChange = (e) => setCustomerServicePrice(e.target.value);
    const handleFeesPriceChange = (e) => setFeesPrice(e.target.value);
    const handleShippingPriceChange = (e) => setShippingPrice(e.target.value);

    const totalUserPrice = parseFloat(item.ProductPrice) + parseFloat(customerServicePrice) + parseFloat(feesPrice) + parseFloat(shippingPrice);

    return (
        <div className="showOrderDetails">
            <Sidebar />
            <Container className="product-detail-container mt-4">
                <h1 className="text-center">{item.ProductName}</h1>

                <div className="scroll-buttons">
                    <Button variant="secondary" onClick={scrollLeft}>&lt;</Button>
                    <div className="scroll-container" ref={scrollRef}>
                        <div className="image-row">
                            {item.Image && item.Image.map((img, index) =>
                                <div key={index} className="image-container">
                                    <Image src={img} fluid className="product-image" />
                                </div>
                            )}
                        </div>
                    </div>
                    <Button variant="secondary" onClick={scrollRight}>&gt;</Button>
                </div>

                <Row className="mt-4">
                    <div className="description-container">
                        <Col md={6}>
                            <h3>Product Description:</h3>
                        </Col>
                        <Col md={6}>
                            <p>{item.productDescription}</p>
                        </Col>
                    </div>
                    <h4>Price: {item.ProductPrice} AED</h4>
                </Row>
                <Row className="mt-4">
                    <Col md={6}>
                        <div className="description-container">
                            <h3>Quantity:</h3>
                            <p>{item.Quantity} pieces</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Form.Group controlId="customerServicePrice">
                        <Form.Label>Customer Service price:</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="CustomerService"
                            value={customerServicePrice} 
                            onChange={handleCustomerServicePriceChange} 
                            placeholder="Enter the Customer Service"
                        />
                    </Form.Group>
                    <Form.Group controlId="feesPrice">
                        <Form.Label>Fees price:</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="Fees" 
                            value={feesPrice} 
                            onChange={handleFeesPriceChange} 
                            placeholder="Enter the Fees you want"
                        />
                    </Form.Group>
                    <Form.Group controlId="shippingPrice">
                        <Form.Label>Shipping Price:</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="ShippingPrice" 
                            value={shippingPrice} 
                            onChange={handleShippingPriceChange} 
                            placeholder="Enter the Shipping price"
                        />
                    </Form.Group>
                    <h4>Total User Price: {totalUserPrice} AED</h4>
                    <Button onClick={handleApprove}>Approve</Button>
                </Row>
            </Container>
        </div>
    );
};

export default ShowOrderDetails;
