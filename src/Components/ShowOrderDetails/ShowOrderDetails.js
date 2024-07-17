import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import { useParams } from "react-router-dom";
import './ShowOrderDetails.css';
import Sidebar from "../SideBar/SideBar";

const ShowOrderDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [userPrice, setUserPrice] = useState('');
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
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleApprove = () => {
        const data = new FormData();
        data.append('QueueID', id);
        data.append('UserPrice', userPrice);
        
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

    return (
        <div className="showOrderDetails">
            <Sidebar />
            <Container className="product-detail-container mt-4">
                <h1 className="text-center">{item.ProductName}</h1>

                <div className="scroll-buttons">
                    <Button variant="secondary" onClick={scrollLeft}>&lt;</Button>
                    <div className="scroll-container" ref={scrollRef}>
                        <div className="image-row">
                            {item.Image && (
                                <div className="image-container">
                                    <Image src={`${item.Image}`} fluid className="product-image" />
                                </div>
                            )}
                        </div>
                    </div>
                    <Button variant="secondary" onClick={scrollRight}>&gt;</Button>
                </div>

                <Row className="mt-4">
                    <Col md={6}>
                        <div className="description-container">
                            <h3>Product Description:</h3>
                            <p>{item.productDescription}</p>
                        </div>
                        <h4>Price: {item.ProductPrice} AED</h4>
                    </Col>
                    <Col md={6}>
                        <div className="description-container">
                            <h3>Quantity:</h3>
                            <p>{item.Quantity} piece</p>
                        </div>
                        <Form.Group controlId="userPrice">
                            <Form.Label>Set the desired price:</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="UserPrice" 
                                value={userPrice} 
                                onChange={(e) => setUserPrice(e.target.value)} 
                                placeholder="Enter the price you want"
                            />
                        </Form.Group>
                        <Button onClick={handleApprove}>Approve</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ShowOrderDetails;
