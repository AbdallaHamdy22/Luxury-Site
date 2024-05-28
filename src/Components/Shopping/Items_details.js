import React, { useState } from 'react';
import { Container, Row, Col, Button, Breadcrumb, ListGroup, Image, Card } from 'react-bootstrap';
import './Items_details.css';
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost/backend/')
      .then(response => {
        const data = response.data;
        const currentItem = data.find(product => product.productsId === Number(id));

        if (currentItem) {
          setItem(currentItem);
          const similar = data.filter(product => 
            (product.productCategory[0] === currentItem.productCategory[0] || product.productBrand[0] === currentItem.productBrand[0]) && 
            product.productsId !== Number(id)
          );
          setSimilarProducts(similar);
        } else {
          console.error('Item not found');
        }
      })
      .catch(error => console.error('Error fetching products:', error));
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
      <Breadcrumb>
        <Breadcrumb.Item href="/" style={{ textDecoration: 'none' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/ItemDetails/${id}`} style={{ textDecoration: 'none' }}>
          {item.productCategory && item.productCategory[0]}'s Watches
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{item.productBrand}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={6}>
          <Image src={item.productImg && item.productImg[selectedImageIndex]} fluid className="main-product-image" />
          <Row className="mt-3">
            {item.productImg && item.productImg.map((img, index) => (
              <Col xs={3} key={index} onClick={() => handleClickThumbnail(index)}>
                <Image src={img} thumbnail className='imgs'/>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <h1>{item.productName}</h1>
          <p className="price">Price: <strong>{item.productPrice} AED</strong></p>
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
      <div className="scroll-buttons">
        <Button variant="secondary" onClick={scrollLeft}>&lt;</Button>
        <div className="scroll-container" ref={scrollRef}>
          <Row className="flex-nowrap">
            {similarProducts.map(product => (
              <Col md={2} key={product.productsId}>
                <Card>
                  <Card.Img variant="top" src={product.productImg[0]} />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>{product.productPrice} AED</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <Button variant="secondary" onClick={scrollRight}>&gt;</Button>
      </div>

      <h3 className="mt-4">Recently Viewed</h3>
      <Row>
        <Col md={2}>
          <Card>
            <Card.Img variant="top" src={"/Images/2.png"}/>
            <Card.Body>
              <Card.Title>Manolo Blahnik</Card.Title>
              <Card.Text>1,518 AED</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Img variant="top" src={"/Images/2.png"}/>
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
