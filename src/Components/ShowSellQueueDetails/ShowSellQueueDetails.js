import { Container, Row, Col, Button, ButtonGroup, Image, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axiosInstance from '../../axiosConfig/instance';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ShowSellQueueDetails.css';
import MessageCard from '../AlertMessage/Message';

const ShowSellQueueDetails = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [selfType, setSelfType] = useState("");
    const [selfMessage, setSelfMessage] = useState("");
    const handleCloseMessage = () => {
        setShowMessage(false);
    };
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [ProductPrice, setProductPrice] = useState(0);
    const [feesPrice, setFeesPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`WaitingList/getQueueDetails.php?QueueID=${id}`)
            .then(response => {
                let data = response.data[0];
                console.log(data.Image);
                data.Image && data.Image.map((img, index) =>console.log(img));
                setItem(data);
            })
            .catch(error => {
                setSelfMessage('Error fetching queue details:', error);
                setSelfType("error");
                setShowMessage(true);
            });
    }, [id]);

    const handleApprove = () => {
        const totalUserPrice = parseFloat(ProductPrice) + parseFloat(feesPrice) + parseFloat(shippingPrice);
        const data = {
            QueueID: id,
            UserPrice: totalUserPrice
        };

        axiosInstance.post('WaitingList/approveQueue.php', data)
        .then(response => {
                console.log(response);
                if (response.data.status === 'success') {
                    setSelfMessage("Order approved and moved to products successfully!");
                    setSelfType("success");
                    setShowMessage(true);
                    setTimeout(() => {
                        navigate('/ShowSellQueue');
                    },3000)
                } else {
                    
                    setSelfMessage('Failed to approve the order: ' + response.data.message);
                    setSelfType("error");
                    setShowMessage(true);
                }
            })
            .catch(error => {
                setSelfMessage("There was an error approving the order!", error);
                setSelfType("error");
                setShowMessage(true);
            });
    };

    const handleIgnore = () => {
        const data = { QueueID: id };

        axiosInstance.post('WaitingList/ignoreQueue.php', data)
            .then(response => {
                if (response.data.status === 'success') {
                    setSelfMessage("Order ignored successfully!");
                    setSelfType("success");
                    setShowMessage(true);
                    setTimeout(() => {
                        navigate('/ShowSellQueue');
                    },3000)
                } else {
                    setSelfMessage('Failed to ignore the order: ' + response.data.message);
                    setSelfType("error");
                    setShowMessage(true);
                }
            })
            .catch(error => {
                setSelfMessage('An error occurred while ignoring the order.',error);
                setSelfType("error");
                setShowMessage(true);
            });
    };

    const handleProductPriceChange = (e) => setProductPrice(e.target.value);
    const handleFeesPriceChange = (e) => setFeesPrice(e.target.value);
    const handleShippingPriceChange = (e) => setShippingPrice(e.target.value);

    const totalUserPrice = parseFloat(ProductPrice) + parseFloat(feesPrice) + parseFloat(shippingPrice);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        centerMode: true,
        centerPadding: "0", // Removes extra padding for centering
        prevArrow: <button type="button" className="slick-prev"></button>,
        nextArrow: <button type="button" className="slick-next"></button>,
    };
    
    return (
        <div className="ShowSellQueueDetails">
            {showMessage&&<MessageCard
                type={selfType}
                message={selfMessage}
                onClose={handleCloseMessage}
            />}
            <Sidebar />
            <div className="main-content">
                <Container className="product-detail-container mt-4">
                    <h1 className="text-center">{item.ProductName}</h1>

                    <Slider {...settings}>
                        {item.Image && item.Image.map((img, index) => (
                            <div key={index} className="image-slide">
                                <Image src={img} alt={`${item.ProductName}`} fluid className="main-product-image" />
                            </div>
                        ))}
                    </Slider>

                    <Row className="mt-4">
                        <div className="description-container">
                            <Col md={6}>
                                <h3>Product Description:</h3>
                            </Col>
                            <Col md={6}>
                                <p>{item.ProductDescription}</p>
                            </Col>
                        </div>
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
                        <Form onSubmit={(e) => e.preventDefault()} className="form-group">
                            <Form.Group controlId="ProductPrice">
                                <Form.Label>Product Price:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="CustomerService"
                                    value={ProductPrice}
                                    onChange={handleProductPriceChange}
                                    placeholder="Enter the Product price"
                                />
                            </Form.Group>
                            <Form.Group controlId="feesPrice">
                                <Form.Label>Fees Price:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="Fees"
                                    value={feesPrice}
                                    onChange={handleFeesPriceChange}
                                    placeholder="Enter the Fees price"
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
                        </Form>
                        <ButtonGroup className="mt-3">
                            <Button variant="success" onClick={handleApprove}>Approve</Button>
                            <Button variant="danger" onClick={handleIgnore}>Ignore</Button>
                        </ButtonGroup>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ShowSellQueueDetails;