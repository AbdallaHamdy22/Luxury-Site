import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './Items_details.css';
import axiosInstance from '../../axiosConfig/instance';
import { addToCart, removeFromCart, updateQuantity } from '../Redux/RDXCart';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = ({ user }) => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [colors, setColors] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const isInCart = cart.some(cartItem => cartItem.ProductID === Number(id) && cartItem.Color === selectedColor && cartItem.Size === selectedSize);

    useEffect(() => {
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
    }, [id]);

    useEffect(() => {
        const cartItem = cart.find(cartItem => cartItem.ProductID === Number(id));
        if (cartItem) {
            setQuantity(cartItem.Quantity);
            setSelectedColor(cartItem.Color);
            setSelectedSize(cartItem.Size);
        }
    }, [cart, id]);

    const handleToggleCart = () => {
        if (!user) {
            alert("Please log in to buy this product");
        } else {
            if (isInCart) {
                const cartItem = cart.find(cartItem => cartItem.ProductID === Number(id) && cartItem.Color === selectedColor && cartItem.Size === selectedSize);
                if (cartItem) {
                    dispatch(removeFromCart({ id: cartItem.ProductID }));
                    setQuantity(1);
                }
            } else {
                setQuantity(1);
                dispatch(addToCart({ ...item, Quantity: quantity, Color: selectedColor, Size: selectedSize }));
            }
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            if (isInCart) {
                dispatch(updateQuantity({ id: item.ProductID, amount: quantity - 1 }));
            }
        }
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        if (isInCart) {
            dispatch(updateQuantity({ id: item.ProductID, amount: quantity + 1 }));
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
                        <div className="size-options">
                            <label>Select Size</label>
                            <div className="sizes">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
                                    <button
                                        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                    >{size}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <p>{item.Description}</p>
                    </div>
                    <div className="details">
                        <p>Sent from <strong>New York, USA</strong></p>
                        <p>Estimated Shipping <strong>$3.99</strong></p>
                    </div>
                </div>
                <div className="order-details">
                    <h2>Order Details</h2>
                    <label>Quantity</label>
                    <div className="quantity-control">
                        <Button className="quantity-button" onClick={handleDecrease}>-</Button>
                        <span className="quantity">{quantity}</span>
                        <Button className="quantity-button" onClick={handleIncrease}>+</Button>
                    </div>
                    <label>Color</label>
                    <input type="text" readOnly value={selectedColor} />
                    <label>Size</label>
                    <input type="text" readOnly value={selectedSize} />
                    <label>Price</label>
                    <input type="text" readOnly value={`${item.Price} AED`} />
                    <div className="subtotal">
                        <p>Sub Total</p>
                        <p>{item.Price} AED</p>
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
