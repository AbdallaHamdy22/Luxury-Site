import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from './../../axiosConfig/instance';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from '../Card/Card';
import './Items.css';

const Items = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance.get('getitems.php')
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

    const filteredProducts = useMemo(() => products.filter((product) => {
        const categoryMatch = selectedCategories.length === 0 || 
            (product.CategoireID && product.CategoireID.some((type) => selectedCategories.includes(type)));
        const brandMatch = selectedBrands.length === 0 ||
            (product.BrandID && product.BrandID.some((type) => selectedBrands.includes(type)));
        return categoryMatch && brandMatch;
    }), [products, selectedCategories, selectedBrands]);

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
                <div className="col-md-9">
                    <div className="row">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.ProductID} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Items;

