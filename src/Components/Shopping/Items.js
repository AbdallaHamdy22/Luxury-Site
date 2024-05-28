import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Items.css';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { addToFavorites, removeFromFavorites } from "../Redux/Rxd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Items = () => {
    const [addToFavoritesSuccess, setAddToFavoritesSuccess] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const favorites = useSelector((state) => state.favorites || []);
    const dispatch = useDispatch();

    const isFavorite = (id) => favorites.some((item) => item.id === id);

    useEffect(() => {
        axios.get('http://localhost/backend/')
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setProducts(data);
                    setAddToFavoritesSuccess(Array(data.length).fill(false));
                } else {
                    console.error('Expected array but got:', data);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleToggleFavorites = (id, index) => {
        if (isFavorite(id)) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites({ id }));
            const updatedSuccessMessages = [...addToFavoritesSuccess];
            updatedSuccessMessages[index] = true;
            setAddToFavoritesSuccess(updatedSuccessMessages);
            setTimeout(() => {
                updatedSuccessMessages[index] = false;
                setAddToFavoritesSuccess(updatedSuccessMessages);
            }, 3000);
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

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategories.length === 0 || 
            (product.productCategory && product.productCategory.some((type) => selectedCategories.includes(type)));
        const brandMatch = selectedBrands.length === 0 ||
            (product.productBrand && product.productBrand.some((type) => selectedBrands.includes(type)));
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
                            <div key={product.productsId} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <div className="card-icons">
                                        <button
                                            onClick={() =>
                                                handleToggleFavorites(
                                                    product.productsId,
                                                    index
                                                )
                                            }
                                            className="favorite-button"
                                        >
                                            <FaStar color={isFavorite(product.productsId) ? "gold" : "white"} />
                                        </button>
                                        <button className="cart-button">
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                    <Link to={`/ItemDetails/${product.productsId}`} style={{ textDecoration: 'none' }}>
                                        <img src={product.productImg[0]} className="card-img-top" alt={product.productName} />
                                    </Link>
                                    <div className="card-body">
                                        <p className="card-text text-danger">Price: {product.productPrice} AED</p>
                                        <h5 className="card-title">{product.productName}</h5>
                                        {product.productLable && (
                                            <span className="badge">{product.productLable}</span>
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
