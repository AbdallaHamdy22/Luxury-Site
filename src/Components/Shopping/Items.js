import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Items.css';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { addToFavorites, removeFromFavorites } from "../Redux/Rxd";
import { useDispatch, useSelector } from "react-redux";

const products = [
    {
        id: 1,
        name: "Rolex Datejust Midsize Steel White Gold Silver Dial Ladies Watch 31 mm",
        price: "38,603 AED",
        image: require("../Images/3.png"),
        label: "Recently Added",
    },
    {
        id: 2,
        name: "Dior Multicolor Canvas Embroidered Bag",
        price: "11,346 AED",
        image: require("../Images/2.png"),
        label: "Recently Added",
    },
    {
        id: 3,
        name: "Dior Multicolor Canvas Embroidered Bag",
        price: "11,346 AED",
        image: require("../Images/4.png"),
        label: "Recently Added",
    },
    {
        id: 4,
        name: "Rolex Datejust Midsize Steel White Gold Silver Dial Ladies Watch 31 mm",
        price: "38,603 AED",
        image: require("../Images/5.png"),
        label: "Recently Added",
    },
    {
        id: 5,
        name: "Dior Multicolor Canvas Embroidered Bag",
        price: "11,346 AED",
        image: require("../Images/6.png"),
        label: "Recently Added",
    },
    {
        id: 6,
        name: "Dior Multicolor Canvas Embroidered Bag",
        price: "11,346 AED",
        image: require("../Images/7.png"),
        label: "Recently Added",
    },
];

const Items = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const dispatch = useDispatch();
    const [addToFavoritesSuccess, setAddToFavoritesSuccess] = useState(Array(products.length).fill(false));
    const favorites = useSelector((state) => state.favorites);

    const isFavorite = (id) => favorites.some((item) => item.id === id);

    const handleToggleFavorites = (id, name, image, index) => {
        if (isFavorite(id)) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites({ id, name, image }));
            const updatedSuccessMessages = [...addToFavoritesSuccess];
            updatedSuccessMessages[index] = true;
            setAddToFavoritesSuccess(updatedSuccessMessages);
            setTimeout(() => {
                updatedSuccessMessages[index] = false;
                setAddToFavoritesSuccess(updatedSuccessMessages);
            }, 3000);
        }
    };

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
                    <h4>Filter by</h4>
                    <div className="mb-3">
                        <h5>Category</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="menCategory" />
                            <label className="form-check-label" htmlFor="menCategory">Men</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="womenCategory" />
                            <label className="form-check-label" htmlFor="womenCategory">Women</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="kidsCategory" />
                            <label className="form-check-label" htmlFor="kidsCategory">Kids</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="homeCategory" />
                            <label className="form-check-label" htmlFor="homeCategory">Home</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <h5>Brands</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="rolexBrand" />
                            <label className="form-check-label" htmlFor="rolexBrand">Rolex</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="diorBrand" />
                            <label className="form-check-label" htmlFor="diorBrand">Dior</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="cartierBrand" />
                            <label className="form-check-label" htmlFor="cartierBrand">Cartier</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="chanelBrand" />
                            <label className="form-check-label" htmlFor="chanelBrand">Chanel</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="dgBrand" />
                            <label className="form-check-label" htmlFor="dgBrand">Dolce & Gabbana</label>
                        </div>
                    </div>
                </aside>
                <main className="col-md-9">
                    <div className="row">
                        {filteredProducts.map((product, index) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <div className="card-icons">
                                        <button
                                            onClick={() =>
                                                handleToggleFavorites(
                                                    product.id,
                                                    product.name,
                                                    product.image,
                                                    index
                                                )
                                            }
                                            className="favorite-button"
                                        >
                                            <FaStar color={isFavorite(product.id) ? "gold" : "white"} />
                                        </button>
                                        <button className="cart-button">
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                    <img src={product.image} className="card-img-top" alt={product.name} />
                                    <div className="card-body">
                                        <p className="card-text text-danger">Price: {product.price}</p>
                                        <h5 className="card-title">{product.name}</h5>
                                        {product.label && (
                                            <span className="badge">{product.label}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                        </ul>
                    </nav>
                </main>
            </div>
        </div>
    );
};

export default Items;
