import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import './Items_details.css';
import axiosInstance from '../../axiosConfig/instance';
import { addToCart, removeFromCart, updateQuantity } from '../Redux/RDXCart';
import { useDispatch, useSelector } from 'react-redux';
import MessageCard from '../AlertMessage/Message';
import Modal from '../Login-Register/Modal';
import LoginModal from '../Login-Register/Login';
const ProductDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => state.user.user);
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [item, setItem] = useState({});
    const [colors, setColors] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [userquantity, setUserQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [notes, setNotes] = useState('');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const isInCart = cart.some(cartItem => cartItem.ProductID === Number(id));
    const [showMessage, setShowMessage] = useState(false);
    const [selfMessage, setSelfMessage] = useState('');
    const [selfType, setSelfType] = useState(''); 

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        const cartItem = cart.find(cartItem => cartItem.ProductID === Number(id));
        if (cartItem) {
            setUserQuantity(cartItem.Quantity);
            setSelectedColor(cartItem.Color || '');
        }
    }, [cart, id]);

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
                setSelfMessage("Item not found");
                setSelfType("error");
                setShowMessage(true);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    const handleBuyNow = () => {
        if (!user) {
            setIsModalOpen(true);
            setSelfMessage("Please log in to buy this product!");
            setSelfType("alert");
            setShowMessage(true);
            return;
        }
        navigate('/buynow', {
            state: {
                items: [{
                    ProductID: item.ProductID,
                    Quantity: userquantity,
                    Price: item.Price,
                    Notes: notes,
                }]
            }
        });
    };

    const handleToggleCart = () => {
        if (!user) {
            setIsModalOpen(true);
            setSelfMessage("Please log in to buy this product!");
            setSelfType("alert");
            setShowMessage(true);
            return;
        }
    
        const adjustedQuantity = userquantity ? userquantity : 1;
    
        if (isInCart) {
            dispatch(removeFromCart({ ProductID: item.ProductID }));
            setUserQuantity(1);
        } else {
            dispatch(addToCart({ ...item, Quantity: adjustedQuantity }));
            setUserQuantity(adjustedQuantity);
        }
    };

    const handleDecrease = () => {
        if (userquantity > 1) {
            const newQuantity = userquantity - 1;
            setUserQuantity(newQuantity);

            if (isInCart) {
                dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity, MainQuantity: item.Quantity + 1 }));
            }
        }
    };

    const handleIncrease = () => {
        if (item.Quantity > userquantity) {
            const newQuantity = userquantity + 1;
            setUserQuantity(newQuantity);

            if (isInCart) {
                dispatch(updateQuantity({ ProductID: item.ProductID, Quantity: newQuantity, MainQuantity: item.Quantity - 1 }));
            }
        } else {
            setSelfMessage(`Only ${item.Quantity} items available in stock`);
            setSelfType("alert");
            setShowMessage(true);
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

    const formattedPrice = new Intl.NumberFormat().format(item.Price);
    const formattedSubtotal = new Intl.NumberFormat().format(item.Price * userquantity);

    return (
        <div className="ItemDetailscontainer">
            {showMessage && (
                <MessageCard
                    type={selfType}
                    message={selfMessage}
                    onClose={handleCloseMessage}
                />
            )}
            <div className="breadcrumbs">
                <a href="/">Home</a> &gt; <a href="/Items">Man</a> &gt; <a href={`/Items/${item.ProductID}`}>{item.Name}</a>
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
                    <h1>{item.Name}</h1>
                    <div className="price">{formattedPrice} AED</div>
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
                    <div className="subtotal">
                        <p>Sub Total</p>
                        <p>{formattedSubtotal} AED</p>
                    </div>
                    <label>Notes</label>
                    <textarea placeholder="Write a note..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                    <label>Discount Coupon</label>
                    <input type="text" placeholder='Enter the coupon for discount..'/>
                    <button className="apply-coupon">Apply Coupon</button>
                    <button className="add-to-cart" onClick={handleToggleCart}>
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <LoginModal setIsModalOpen={setIsModalOpen} />
            </Modal>
        </div>
    );
};

export default ProductDetails;
