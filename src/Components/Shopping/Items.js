import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './../../axiosConfig/instance';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from '../Card/Card';
import './Items.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Items = () => {
    const query = useQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSexes, setSelectedSexes] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sexes, setSexes] = useState([]);
    const [showAllBrands, setShowAllBrands] = useState(false);

    useEffect(() => {
        axiosInstance.get('Products/getproduct.php')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));

        axiosInstance.get('Categoire/getcategoire.php')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));

        axiosInstance.get('Brand/getbrand.php')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => console.error('Error fetching brands:', error));

        axiosInstance.get('Sex/getsex.php')
            .then(response => {
                setSexes(response.data);
            })
            .catch(error => console.error('Error fetching sexes:', error));
    }, []);

    useEffect(() => {
        const category = query.get("category");
        const sex = query.get("sex");
        const brand = query.get("brand");

        if (category) setSelectedCategories(category.split(","));
        if (sex) setSelectedSexes(sex.split(",")); // Handle multiple sexes if needed
        if (brand) setSelectedBrands(brand.split(","));
    }, [location.search]);

    const updateURL = (newCategories, newBrands, newSexes) => {
        const params = new URLSearchParams();

        if (newCategories.length > 0) {
            params.set("category", newCategories.join(","));
        }

        if (newBrands.length > 0) {
            params.set("brand", newBrands.join(","));
        }

        if (newSexes.length > 0) {
            params.set("sex", newSexes.join(","));
        }

        navigate({ search: params.toString() });
    };

    const handleCategoryChange = (event) => {
        const { id, checked } = event.target;
        const newCategories = checked
            ? [...selectedCategories, id]
            : selectedCategories.filter((category) => category !== id);

        setSelectedCategories(newCategories);
        updateURL(newCategories, selectedBrands, selectedSexes);
    };

    const handleBrandChange = (event) => {
        const { id, checked } = event.target;
        const newBrands = checked
            ? [...selectedBrands, id]
            : selectedBrands.filter((brand) => brand !== id);

        setSelectedBrands(newBrands);
        updateURL(selectedCategories, newBrands, selectedSexes);
    };

    const handleSexChange = (event) => {
        const { id, checked } = event.target;
        const newSexes = checked
            ? [...selectedSexes, id]
            : selectedSexes.filter((sex) => sex !== id);

        setSelectedSexes(newSexes);
        updateURL(selectedCategories, selectedBrands, newSexes);
    };

    const toggleShowAllBrands = () => {
        setShowAllBrands(!showAllBrands);
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
                        {brands.slice(0, 5).map(brand => (
                            <div className="form-check" key={brand.BrandID}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={brand.BrandID}
                                    onChange={handleBrandChange}
                                    checked={selectedBrands.includes(brand.BrandID.toString())}
                                />
                                <label className="form-check-label" htmlFor={brand.BrandID}>{brand.Name}</label>
                            </div>
                        ))}
                        {brands.length > 5 && (
                            <div className="show-more" onClick={toggleShowAllBrands}>
                                {showAllBrands ? 'Show Less' : 'Show More'}
                            </div>
                        )}
                        {showAllBrands && brands.slice(5).map(brand => (
                            <div className="form-check" key={brand.BrandID}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={brand.BrandID}
                                    onChange={handleBrandChange}
                                    checked={selectedBrands.includes(brand.BrandID.toString())}
                                />
                                <label className="form-check-label" htmlFor={brand.BrandID}>{brand.Name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-3">
                        <h5>Gender</h5>
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
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.ProductID} product={product} />
                            ))
                        ) : (
                            <p>No products found matching the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Items;
