import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import { useParams } from "react-router-dom";
import './ShowOrderDetails.css';
import Sidebar from "../SideBar/SideBar";
const ShowOrderDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
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
                </Col>
            </Row>
            </Container>
            </div>
    );
};

export default ShowOrderDetails;
