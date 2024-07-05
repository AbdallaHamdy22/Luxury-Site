import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from './../../axiosConfig/instance';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from '../Card/Card';
import './Items.css';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Items = () => {
    const query = useQuery();
    const location = useLocation();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSexes, setSelectedSexes] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sexes, setSexes] = useState([]);

    useEffect(() => {
        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Products/getproduct.php')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));

        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Categoire/getcategoire.php')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));

        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Brand/getbrand.php')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => console.error('Error fetching brands:', error));

        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Sex/getSex.php')
            .then(response => {
                setSexes(response.data);
            })
            .catch(error => console.error('Error fetching sexes:', error));
    }, []);

    useEffect(() => {
        const category = query.get("category");
        const sex = query.get("sex");

        if (category) setSelectedCategories([category]);
        if (sex) setSelectedSexes([sex]);
    }, [location.search]); // هنا نراقب تغييرات العنوان URL

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

    const handleSexChange = (event) => {
        const { id, checked } = event.target;
        setSelectedSexes((prevSexes) => {
            if (checked) {
                return [...prevSexes, id];
            } else {
                return prevSexes.filter((sex) => sex !== id);
            }
        });
    };

    const filteredProducts = useMemo(() => products.filter((product) => {
        const categoryMatch = selectedCategories.length === 0 || 
            (product.CategoireID && selectedCategories.includes(product.CategoireID.toString()));
        const brandMatch = selectedBrands.length === 0 ||
            (product.BrandID && selectedBrands.includes(product.BrandID.toString()));
        const sexMatch = selectedSexes.length === 0 ||
            (product.SexID && selectedSexes.includes(product.SexID.toString()));
        return categoryMatch && brandMatch && sexMatch;
    }), [products, selectedCategories, selectedBrands, selectedSexes]);

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
                        {categories.map(category => (
                            <div className="form-check" key={category.CategoireID}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={category.CategoireID}
                                    onChange={handleCategoryChange}
                                    checked={selectedCategories.includes(category.CategoireID.toString())}
                                />
                                <label className="form-check-label" htmlFor={category.CategoireID}>{category.Name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-3">
                        <h5>Brands</h5>
                        {brands.map(brand => (
                            <div className="form-check" key={brand.BrandID}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={brand.BrandID}
                                    onChange={handleBrandChange}
                                />
                                <label className="form-check-label" htmlFor={brand.BrandID}>{brand.Name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-3">
                        <h5>Sex</h5>
                        {sexes.map(sex => (
                            <div className="form-check" key={sex.SexID}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={sex.SexID}
                                    onChange={handleSexChange}
                                    checked={selectedSexes.includes(sex.SexID.toString())}
                                />
                                <label className="form-check-label" htmlFor={sex.SexID}>{sex.Name}</label>
                            </div>
                        ))}
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
