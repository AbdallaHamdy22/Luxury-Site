import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import { useParams } from "react-router-dom";
import './ShowOrderDetails.css';

const ShowOrderDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        axiosInstance.get(`Products/getProductDetails.php?ProductID=${id}`)
            .then(response => {
                let data = response.data;
                setItem(data);
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    const handleClickThumbnail = (index) => {
        setSelectedImageIndex(index);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <Container className="product-detail-container mt-4">
            <h1 className="text-center">{item.Name}</h1>

            <div className="scroll-buttons">
                <Button variant="secondary" onClick={scrollLeft}>&lt;</Button>
                <div className="scroll-container" ref={scrollRef}>
                    <div className="image-row">
                        {Array.isArray(item.Images) && item.Images.length > 0 && item.Images.map((img, index) => (
                            <div key={index} className={`image-container ${index === selectedImageIndex ? 'selected' : ''}`} onClick={() => handleClickThumbnail(index)}>
                                <Image src={img} fluid className="product-image" />
                            </div>
                        ))}
                    </div>
                </div>
                <Button variant="secondary" onClick={scrollRight}>&gt;</Button>
            </div>

            <Row className="mt-4">
                <Col md={6}>
                    <div className="description-container">
                        <h3>Product Description:</h3>
                        <p>{item.Description}</p>
                    </div>
                    <h4>Price: {item.Price} AED</h4>
                </Col>
                <Col md={6}>
                    <div className="description-container">
                        <h3>Quantity</h3>
                        <p>{item.Quantity} piece</p>
                    </div>
                    <h4>Price: {item.Price} AED</h4>
                </Col>
            </Row>
        </Container>
    );
};

export default ShowOrderDetails;
