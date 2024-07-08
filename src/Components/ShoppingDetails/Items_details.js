import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Breadcrumb, ListGroup, Image, Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axiosInstance from '../../axiosConfig/instance';
import './Items_details.css';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    axiosInstance.get(`Products/getProductDetails.php?ProductID=${id}`)
      .then(response => {
        let data = response.data;

        const removeSpacesFromKeys = (obj) => {
          const newObj = {};
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              const newKey = key.replace(/ /g, '');
              newObj[newKey] = obj[key];
            }
          }
          return newObj;
        };

        data = removeSpacesFromKeys(data);

        if (data.ProductID) {
          console.log(data.SexID);
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

  const handleClickThumbnail = (index) => {
    setSelectedImageIndex(index);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  console.log(item);

  return (
    <Container className="product-detail-container mt-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/" style={{ textDecoration: 'none' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/ItemDetails/${id}`} style={{ textDecoration: 'none' }}>
          {item.CategoireID && `${item.CategoireID}'s Watches`}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{item.BrandID}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={6}>
          {item.Images && (
            <Image src={item.Images} fluid className="main-product-image" />
          )}
          {Array.isArray(item.Images) && item.Images.length > 0 && (
            <Row className="mt-3">
              {item.Images.map((img, index) => (
                <Col xs={3} key={index} onClick={() => handleClickThumbnail(index)}>
                  <Image src={img} thumbnail className='imgs'/>
                </Col>
              ))}
            </Row>
          )}
        </Col>
        <Col md={6}>
          <h1>{item.Name}</h1>
          <p className="price">Price: <strong>{item.Price} AED</strong></p>
          <Button variant="primary" className="mb-3">Buy Now</Button>
          <Button variant="secondary" className="mb-3 ml-2">Add to Bag</Button>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Overview</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Gender:</strong> {item.SexID}</ListGroup.Item>
                <ListGroup.Item><strong>Bracelet Material:</strong> {item.BraceletMaterial || 'N/A'}</ListGroup.Item>
                
                <ListGroup.Item><strong>Production Year:</strong> {item.ProductionYear || 'N/A'}</ListGroup.Item>
                
                <ListGroup.Item><strong>Description:</strong> {item.Description || 'N/A'}</ListGroup.Item>
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
              <Col md={2} key={product.ProductID}>
                <Card>
                  <Card.Img variant="top" src={product.Images} />
                  <Card.Body>
                    <Card.Title>{product.Name}</Card.Title>
                    <Card.Text>{product.Price} AED</Card.Text>
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
