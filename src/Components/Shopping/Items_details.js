import React from 'react';
import { Container, Row, Col, Button, Breadcrumb, ListGroup, Image, Card, Tabs, Tab } from 'react-bootstrap';
import './Items_details.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  return (
    <Container className="product-detail-container mt-4">
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Women's Watches</Breadcrumb.Item>
        <Breadcrumb.Item active>Rolex Datejust</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={6}>
          <Image src={require('../Images/2.png')} fluid className="main-product-image" />
          <Row className="mt-3">
            <Col xs={3}><Image src={require('../Images/2.png')} thumbnail /></Col>
            <Col xs={3}><Image src={require('../Images/2.png')} thumbnail /></Col>
            <Col xs={3}><Image src={require('../Images/2.png')} thumbnail /></Col>
            <Col xs={3}><Image src={require('../Images/2.png')} thumbnail /></Col>
          </Row>
        </Col>
        <Col md={6}>
          <h1>Rolex Datejust Midsize Steel White Gold Silver Dial Ladies Watch 31 mm</h1>
          <p className="price">Price: <strong>38,603 AED</strong></p>
          <Button variant="primary" className="mb-3">Buy Now</Button>
          <Button variant="secondary" className="mb-3 ml-2">Add to Bag</Button>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Overview</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Gender:</strong> Women</ListGroup.Item>
                <ListGroup.Item><strong>Bracelet Material:</strong> Stainless Steel</ListGroup.Item>
                <ListGroup.Item><strong>Complication:</strong> Date</ListGroup.Item>
                <ListGroup.Item><strong>Production Year:</strong> 2012</ListGroup.Item>
                <ListGroup.Item><strong>Movement Type:</strong> Automatic</ListGroup.Item>
                <ListGroup.Item><strong>Includes:</strong> Rolex box and card</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Delivery & Returns</Card.Title>
              <p>Delivery by UNITED ARAB EMIRATES</p>
              <p>Get it by Jan 12, 2024</p>
              <p>Pick-Up from Store Locations</p>
              <p>Dubai: Jan 2, 2024</p>
              <p>Abu Dhabi: Jan 2, 2024</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="mt-4">Similar Products</h3>
      <Row>
        <Col md={2}>
          <Card>
            <Card.Img variant="top" src={require('../Images/8.jpeg')} />
            <Card.Body>
              <Card.Title>Rolex Datejust 36</Card.Title>
              <Card.Text>69,070 AED</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Img variant="top" src={require('../Images/8.jpeg')} />
            <Card.Body>
              <Card.Title>Rolex Datejust President</Card.Title>
              <Card.Text>73,768 AED</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="mt-4">Recently Viewed</h3>
      <Row>
        <Col md={2}>
          <Card>
            <Card.Img variant="top" src={require('../Images/8.jpeg')}/>
            <Card.Body>
              <Card.Title>Manolo Blahnik</Card.Title>
              <Card.Text>1,518 AED</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Img variant="top" src={require('../Images/8.jpeg')}/>
            <Card.Body>
              <Card.Title>Cartier Ring</Card.Title>
              <Card.Text>5,783 AED</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetails;
