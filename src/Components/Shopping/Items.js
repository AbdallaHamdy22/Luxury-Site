import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Items.css';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { addToFavorites, removeFromFavorites } from "../Redux/RDXFav";
import { addToCart, removeFromCart } from "../Redux/RDXCart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const Items = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const isFavorite = (id) => favorites.some((item) => item.id === id);
    const isInCart = (id) => cart.some((item) => item.id === id);
    const favorites = useSelector((state) => state.favorites || []);
    const cart = useSelector((state) => state.cart || []);

    useEffect(() => {
        axios.get('http://localhost/backend/getitems.php')
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Expected array but got:', data);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleToggleFavorites = (id) => {
        console.log(id);
        if (isFavorite(id)) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites({ id }));
        }
    };

    const handleToggleCart = (id) => {
        if (isInCart(id)) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(addToCart({ id }));
        }
    };

    const handleCategoryChange = (event) => {
        const { id, checked } = event.target;
        setSelectedCategories((prevCategories) => {
            if (checked) {
                return [...prevCategories, id];
            } else {
                return prevCategories.filter((category) => category !== id);
            }
        });
    };

    const handleBrandChange = (event) => {
        const { id, checked } = event.target;
        setSelectedBrands((prevBrands) => {
            if (checked) {
                return [...prevBrands, id];
            } else {
                return prevBrands.filter((brand) => brand !== id);
            }
        });
    };

    const isRecentlyAdded = (addedDate) => {
        const currentDate = dayjs();
        const addedDateDayjs = dayjs(addedDate);
        return currentDate.diff(addedDateDayjs, 'day') <= 3;
    };

    const isOffer = (Price, Offer) => {
        if (Offer !== 0){
            const OfferPrice = Price * Offer;
            const DiscountPrice=Price-OfferPrice
            return DiscountPrice;
        }
        else {
            return;
        }
    };

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategories.length === 0 || 
            (product.CategoireID && product.CategoireID.some((type) => selectedCategories.includes(type)));
        const brandMatch = selectedBrands.length === 0 ||
            (product.BrandID && product.BrandID.some((type) => selectedBrands.includes(type)));
        return categoryMatch && brandMatch;
    });

    return (
        <div className="Itms container mt-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">What's New</li>
                </ol>
            </nav>
            <div className="row">
                <aside className="col-md-3">
                    <h3>Filter by</h3>
                    <div className="mb-3">
                        <h5>Category</h5>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="Men"
                                onChange={handleCategoryChange}
                            />
                            <label className="form-check-label" htmlFor="Men">Men</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="Women"
                                onChange={handleCategoryChange}
                            />
                            <label className="form-check-label" htmlFor="Women">Women</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="Kids"
                                onChange={handleCategoryChange}
                            />
                            <label className="form-check-label" htmlFor="Kids">Kids</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="Home"
                                onChange={handleCategoryChange}
                            />
                            <label className="form-check-label" htmlFor="Home">Home</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <h5>Brands</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="Rolex" onChange={handleBrandChange}/>
                            <label className="form-check-label" htmlFor="Rolex">Rolex</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="Dior" onChange={handleBrandChange} />
                            <label className="form-check-label" htmlFor="Dior">Dior</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="Cartier" onChange={handleBrandChange} />
                            <label className="form-check-label" htmlFor="Cartier">Cartier</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="Chanel" onChange={handleBrandChange} />
                            <label className="form-check-label" htmlFor="Chanel">Chanel</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="Dolce & Gabbana" onChange={handleBrandChange} />
                            <label className="form-check-label" htmlFor="Dolce & Gabbana">Dolce & Gabbana</label>
                        </div>
                    </div>
                </aside>
                <main className="col-md-9">
                    <div className="row">
                        {filteredProducts && filteredProducts.map((product, index) => (
                            <div key={product.productID} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <div className="card-icons">
                                        <button
                                            onClick={() => handleToggleFavorites(product.ProductID)}
                                            className="favorite-button"
                                        >
                                            <FaStar color={isFavorite(product.ProductID) ? "gold" : "white"} />
                                        </button>
                                        <button
                                            onClick={() => handleToggleCart(product.ProductID)}
                                            className="cart-button"
                                        >
                                            <FaShoppingCart color={isInCart(product.ProductID) ? "blue" : "white"} />
                                        </button>
                                    </div>
                                    <Link to={`/ItemDetails/${product.ProductID}`} style={{ textDecoration: 'none' }}>
                                        <img src={product.Image[0]} className="card-img-top" alt={product.Name} />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.Name}</h5>
                                        <p className="card-text text-muted">{product.Description}</p>
                                        {isOffer(product.Price,product.OfferPrice) ? (<>
                                            <i><p className="card-text text-danger">Discount {product.OfferPrice*100} %</p></i>
                                            <p className="card-text text-danger">
                                                <del>Price: {product.Price} AED</del> {isOffer(product.Price,product.OfferPrice)} AED
                                            </p>
                                            </>) : (
                                            <p className="card-text text-muted ">Price: {product.Price} AED</p>
                                        )}
                                        {isRecentlyAdded(product.date) && (
                                            <span className="badge">Recently added</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><a className="page-link" href="/Items">1</a></li>
                            <li className="page-item"><a className="page-link" href="/Items">2</a></li>
                            <li className="page-item"><a className="page-link" href="/Items">3</a></li>
                        </ul>
                    </nav>
                </main>
            </div>
        </div>
    );
};

export default Items;
