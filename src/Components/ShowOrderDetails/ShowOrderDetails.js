import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axiosInstance from '../../axiosConfig/instance';
import Sidebar from "../SideBar/SideBar";
import MessageCard from '../AlertMessage/Message';
import './ShowOrderDetails.css';

const ShowOrderDetails = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [selfType, setSelfType] = useState("");
    const [selfMessage, setSelfMessage] = useState("");

    useEffect(() => {
        axiosInstance.get(`Orders/getOrderdetails.php?QueueID=${id}`)
            .then(response => {
                setOrderDetails(response.data);
            })
            .catch(error => {
                console.log(error);
                
                setSelfMessage('Error fetching order details.');
                setSelfType("error");
                setShowMessage(true);
            });
    }, [id]);

    const changePriceInput = (price) => {
        const formattedPrice = new Intl.NumberFormat().format(price);
        return formattedPrice;
    }

    const handleCloseMessage = () => {
        setShowMessage(false);
    };
    return (
        <div className="show-order-details-container">
            {showMessage && (
                <MessageCard
                    type={selfType}
                    message={selfMessage}
                    onClose={handleCloseMessage}
                />
            )}
            <Sidebar />
            <Container className="order-details-content">
                <h1>Order Details</h1>
                {orderDetails.length > 0 ? (
                    orderDetails.map((detail) => (
                        <div key={detail.OrderDetailsID} className="order-detail">
                            <Row>
                                <Col md={3}><strong>Order detail ID:</strong></Col>
                                <Col md={9}>{detail.OrderDetailsID}</Col>
                            </Row>
                            <Row>
                                <Col md={3}><strong>Order ID:</strong></Col>
                                <Col md={9}>{detail.OrderID}</Col>
                            </Row>
                            <Row>
                                <Col md={3}><strong>Product ID:</strong></Col>
                                <Col md={9}>{detail.ProductID}</Col>
                            </Row>
                            <Row>
                                <Col md={3}><strong>Quantity:</strong></Col>
                                <Col md={9}>{detail.Quantity}</Col>
                            </Row>
                            <Row>
                                <Col md={3}><strong>Price:</strong></Col>
                                <Col md={9}>{changePriceInput(detail.Price)} AED</Col>
                            </Row>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No order details available.</p>
                )}
                <Button className="back-button" href="/ShowOrders">Back to Orders</Button>
            </Container>
        </div>
    );
};

export default ShowOrderDetails;
