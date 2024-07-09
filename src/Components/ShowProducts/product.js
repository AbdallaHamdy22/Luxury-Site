import React, { useEffect, useState } from 'react';
import axiosInstance from './../../axiosConfig/instance';
import './product.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sexes, setSexes] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        ProductID: null,
        Name: '',
        Description: '',
        ProductionYear: '',
        BraceletMaterial: '',
        Price: '',
        Quantity: '',
        Image: '',
        OfferPrice: '',
        BrandID: '',
        CategoryID: '',
        ColorID: '',
        SexID: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const productsPerPage = 10;

    useEffect(() => {
        fetchProducts();
        fetchAuxiliaryData();
    }, [currentPage]);

    const fetchProducts = () => {
        axiosInstance.get(`http://localhost/dashboard/LUXURY-SITE/Products/showproduct_page.php?page=${currentPage + 1}&limit=${productsPerPage}`)
            .then(response => {
                setProducts(response.data.data || []);
                setPageCount(Math.ceil(response.data.total / productsPerPage));
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    };

    const fetchAuxiliaryData = () => {
        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Brand/getbrand.php')
            .then(response => {
                setBrands(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the brands!", error);
            });

        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Categoire/getcategoire.php')
            .then(response => {
                setCategories(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });

        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Color/getcolor.php')
            .then(response => {
                setColors(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the colors!", error);
            });

        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Sex/getsex.php')
            .then(response => {
                setSexes(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the sexes!", error);
            });
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setImagePreview(product.Image);
        setShow(true);
    };

    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentProduct({ ...currentProduct, Image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = (handleCloseCallback) => {
        setLoading(true);
        const formData = new FormData();
        for (const key in currentProduct) {
            if (currentProduct[key] !== null) {
                formData.append(key, currentProduct[key]);
            }
        }

        const url = currentProduct.ProductID ? 'http://localhost/dashboard/LUXURY-SITE/Products/updateproduct.php' : 'http://localhost/dashboard/LUXURY-SITE/Products/addproduct.php';

        if (currentProduct.ProductID === null) {
            axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Products/getlastid.php')
                .then(response => {
                    const lastID = response.data.LastID;
                    formData.append('ProductID', lastID + 1);
                    axiosInstance.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        fetchProducts();
                        setLoading(false);
                        handleCloseCallback();
                    })
                    .catch(error => {
                        console.error("There was an error saving the product!", error);
                        setLoading(false);
                    });
                })
                .catch(error => {
                    console.error("There was an error fetching the last ID!", error);
                    setLoading(false);
                });
        } else {
            axiosInstance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                fetchProducts();
                setLoading(false);
                handleCloseCallback();
            })
            .catch(error => {
                console.error("There was an error saving the product!", error);
                setLoading(false);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axiosInstance.post('http://localhost/dashboard/LUXURY-SITE/Products/deleteproduct.php', { ProductID: id })
                .then(response => {
                    fetchProducts();
                })
                .catch(error => {
                    console.error("There was an error deleting the product!", error);
                });
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value === "") {
            fetchProducts();
        } else {
            const filtered = products.filter(product => 
                product.ProductID.toString().includes(value) || 
                product.Name.toLowerCase().includes(value.toLowerCase())
            );
            setProducts(filtered);
        }
    };

    const handleAddProduct = () => {
        const newProduct = {
            ProductID: null,
            Name: '',
            Description: '',
            ProductionYear: '',
            BraceletMaterial: '',
            Price: '',
            Quantity: '',
            Image: '',
            OfferPrice: '',
            BrandID: '',
            CategoryID: '',
            ColorID: '',
            SexID: ''
        };
        setCurrentProduct(newProduct);
        setImagePreview('');
        setShow(true);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayedProducts = products.slice(0, productsPerPage);

    return (
        <div className="product-table">
            <h1>Products List</h1>
            <input 
                type="text" 
                placeholder="Search by ID or Name" 
                value={searchTerm} 
                onChange={handleSearch} 
                className="search-input" 
            />
            <div className="button-container">
                <button onClick={handleAddProduct} className="add-button">Add Product</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Production Year</th>
                        <th>Bracelet Material</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
                        <th>Offer Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Color</th>
                        <th>Sex</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedProducts.map(product => (
                        <tr key={product.ProductID}>
                            <td>{product.ProductID}</td>
                            <td>{product.Name}</td>
                            <td>{product.Description}</td>
                            <td>{product.ProductionYear}</td>
                            <td>{product.BraceletMaterial}</td>
                            <td>{product.Price}</td>
                            <td>{product.Quantity}</td>
                            <td><img src={product.Image} alt={product.Name} className="product-image" /></td>
                            <td>{product.OfferPrice}</td>
                            <td>{brands.find(brand => brand.BrandID === product.BrandID)?.Name}</td>
                            <td>{categories.find(category => category.CategoireID === product.CategoireID)?.Name}</td>
                            <td>{colors.find(color => color.ColorID === product.ColorID)?.Name}</td>
                            <td>{sexes.find(sex => sex.SexID === product.SexID)?.Name}</td>
                            <td><button onClick={() => handleEdit(product)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(product.ProductID)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            <PopForm show={show} handleClose={handleClose} handleSave={handleSave}>
                <h2>{currentProduct.ProductID ? 'Edit Product' : 'Add Product'}</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="ProductID" value={currentProduct.ProductID || ''} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentProduct.Name || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="Description" value={currentProduct.Description || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Production Year:
                        <input type="text" name="ProductionYear" value={currentProduct.ProductionYear || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Bracelet Material:
                        <input type="text" name="BraceletMaterial" value={currentProduct.BraceletMaterial || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="Price" value={currentProduct.Price || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" name="Quantity" value={currentProduct.Quantity || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Image:
                        <input type="file" name="Image" onChange={handleImageChange} />
                    </label>
                    {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                    <label>
                        Offer Price:
                        <input type="number" name="OfferPrice" value={currentProduct.OfferPrice || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Brand:
                        <select name="BrandID" value={currentProduct.BrandID || ''} onChange={handleChange}>
                            <option value="">Select Brand</option>
                            {brands.map(brand => (
                                <option key={brand.BrandID} value={brand.BrandID}>{brand.Name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Category:
                        <select name="CategoireID" value={currentProduct.CategoireID || ''} onChange={handleChange}>
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.CategoireID} value={category.CategoireID}>{category.Name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Color:
                        <select name="Color_ID" value={currentProduct.Color_ID || ''} onChange={handleChange}>
                            <option value="">Select Color</option>
                            {colors.map(color => (
                                <option key={color.Color_ID} value={color.Color_ID}>{color.Name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Gender:
                        <select name="SexID" value={currentProduct.SexID || ''} onChange={handleChange}>
                            <option value="">Select Gender</option>
                            {sexes.map(sex => (
                                <option key={sex.SexID} value={sex.SexID}>{sex.Name}</option>
                            ))}
                        </select>
                    </label>
                </form>
            </PopForm>
        </div>
    );
};

export default ShowProducts;