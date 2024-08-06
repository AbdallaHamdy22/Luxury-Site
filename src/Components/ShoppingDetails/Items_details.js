import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './Items_details.css';
import axiosInstance from '../../axiosConfig/instance';
import { addToCart, removeFromCart, updateQuantity } from '../Redux/RDXCart';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {
    const user = useSelector((state) => state.user.user);
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [colors, setColors] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [userquantity, setUserQuantity] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const isInCart = cart.some(cartItem => cartItem.ProductID === Number(id));

    useEffect(() => {
        fetchData();
    }, [userquantity]);

    useEffect(() => {
        const cartItem = cart.find(cartItem => cartItem.ProductID === Number(id));
        if (cartItem) {
            setUserQuantity(cartItem.Quantity);
            setSelectedColor(cartItem.Color || '');
        }
    }, [cart, id, selectedColor]);

    const fetchData = () => {
        Promise.all([
            axiosInstance.get(`Products/getProductDetails.php?ProductID=${id}`),
            axiosInstance.get('Color/getcolor.php')
        ])
        .then(([productResponse, colorsResponse]) => {
            const productData = productResponse.data;
            const colorsData = colorsResponse.data;
            
            if (productData.ProductID) {
                setItem(productData);
                setSelectedImage(productData.Image ? productData.Image[0] : '');
                const filteredColors = colorsData.filter(color => color.Color_ID === productData.Color_ID);
                setColors(filteredColors);
            } else {
                console.error('Item not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    const handleToggleCart = async () => {
        if (!user) {
            alert("Please log in to buy this product");
            return;
        }
    
        const adjustedQuantity = userquantity ? userquantity : 1;
    
        if (isInCart) {
            dispatch(removeFromCart({ ProductID: item.ProductID }));
            await axiosInstance.post('Products/updateProductQuantity.php', {
                ProductID: item.ProductID,
                quantity: item.Quantity + adjustedQuantity
            });
            setUserQuantity(0);
            setItem(prevItem => ({ ...prevItem, Quantity: prevItem.Quantity + adjustedQuantity }));
        } else {
            dispatch(addToCart({ ...item, Quantity: adjustedQuantity }));
            await axiosInstance.post('Products/updateProductQuantity.php', {
                ProductID: item.ProductID,
                quantity: item.Quantity - adjustedQuantity
            });
            setUserQuantity(adjustedQuantity);
            setItem(prevItem => ({ ...prevItem, Quantity: prevItem.Quantity - adjustedQuantity }));
        }
    };
    
    const handleDecrease = async () => {
        if (userquantity > 1) {
            const newQuantity = userquantity - 1;
            if (isInCart) {
                dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity }));
                await axiosInstance.post('Products/updateProductQuantity.php', {
                    ProductID: item.ProductID,
                    quantity: item.Quantity + 1
                });
                setUserQuantity(newQuantity);
                setItem(prevItem => ({ ...prevItem, Quantity: prevItem.Quantity + 1 }));
            }
        }
    };
    

    const handleIncrease = async () => {
        if (item.Quantity > 0 && item.MainQuantity > userquantity) {
            const newQuantity = userquantity + 1;
            if (isInCart) {
                dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity }));
                await axiosInstance.post('Products/updateProductQuantity.php', {
                    ProductID: item.ProductID,
                    quantity: item.Quantity - 1
                });
                setUserQuantity(newQuantity);
                setItem(prevItem => ({ ...prevItem, Quantity: prevItem.Quantity - 1 }));
            }
        } else {
            alert(`Only ${item.Quantity} items available in stock`);
        }
    };
    
    
    const handleImageClick = (img) => {
        setSelectedImage(img);
    };

    const handlePrevImage = () => {
        const newIndex = currentImageIndex === 0 ? item.Image.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
        setSelectedImage(item.Image[newIndex]);
    };

    const handleNextImage = () => {
        const newIndex = currentImageIndex === item.Image.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
        setSelectedImage(item.Image[newIndex]);
    };

    return (
        <div className="container">
            <div className="breadcrumbs">
                <a href="/">Home</a> &gt; <a href="/Items">Man</a> &gt; <a href="#">{item.Name}</a>
            </div>
            <div className="product-page">
                <div className="product-images">
                    <div className="main-image-container">
                        {selectedImage && <img src={selectedImage} alt="Main Product" className="main-image" />}
                        <button className="image-nav-button prev-button" onClick={handlePrevImage}>❮</button>
                        <button className="image-nav-button next-button" onClick={handleNextImage}>❯</button>
                    </div>
                    <div className="thumbnail-images">
                        {item.Image && item.Image.map((img, index) =>
                            <img src={img} alt={`img ${index}`} key={index} onClick={() => handleImageClick(img)} />
                        )}
                    </div>
                </div>
                <div className="product-details">
                    <h1>{item.Description}</h1>
                    <div className="price">{item.Price} AED</div>
                    <div className="options">
                        <div className="color-options">
                            <label>Select Color</label>
                            <div className="colors">
                            {colors && colors.map((clr, indx) =>
                                <button
                                    className={`color-button ${selectedColor === clr.Name ? 'selected' : ''}`}
                                    key={indx}
                                    onClick={() => setSelectedColor(clr.Name)}
                                >{clr.Name}</button>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <p>{item.Description}</p>
                    </div>
                    <div className="details">
                        <p>Sent from <strong>New York, USA</strong></p>
                        <p>Estimated Shipping <strong>{ item.Price } AED</strong></p>
                    </div>
                </div>
                <div className="order-details">
                    <h2>Order Details</h2>
                    <label>Quantity</label>
                    <div className="quantity-control">
                        <Button className="quantity-button" onClick={handleDecrease}>-</Button>
                        <span className="quantity">{userquantity}</span>
                        <Button className="quantity-button" onClick={handleIncrease}>+</Button>
                    </div>
                    <label>Color</label>
                    <input type="text" readOnly value={selectedColor || ''} />
                    <label>Item Price</label>
                    <input type="text" readOnly value={`${item.Price || 0} AED`} />
                    <div className="subtotal">
                        <p>Sub Total</p>
                        <p>{(item.Price * userquantity).toFixed(2)} AED</p>
                    </div>
                    <label>Notes</label>
                    <textarea placeholder="Write a note..."></textarea>
                    <label>Discount Size</label>
                    <input type="text" readOnly value="-" />
                    <button className="apply-coupon">Apply Coupon</button>
                    <Button className="buy-now">Buy Now</Button>
                    <Button className="add-to-cart" onClick={handleToggleCart}>
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
