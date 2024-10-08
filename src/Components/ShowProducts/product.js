import React, { useEffect, useState } from 'react';
import axiosInstance from './../../axiosConfig/instance';
import './product.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';
import Sidebar from "../SideBar/SideBar";
import { useSelector } from 'react-redux';
import MessageCard from '../AlertMessage/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ShowProducts = () => {
    const user = useSelector((state) => state.user.user);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sexes, setSexes] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        ProductID: null,
        UserID: null,
        Status: '',
        Name: '',
        Description: '',
        ProductionYear: '',
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
    const [showMessage, setShowMessage] = useState(false);
    const [selfMessage, setSelfMessage] = useState('');
    const [selfType, setSelfType] = useState(''); 
    const productsPerPage = 10;

    useEffect(() => {
        fetchProducts();
        fetchAuxiliaryData();
    }, [currentPage]);

    const fetchProducts = () => {
        axiosInstance.get(`Products/showproduct_page.php?page=${currentPage + 1}&limit=${productsPerPage}`)
            .then(response => {
                setProducts(response.data.data || []);
                setPageCount(Math.ceil(response.data.total / productsPerPage));
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    };

    const fetchAuxiliaryData = () => {
        axiosInstance.get('Brand/getbrand.php')
            .then(response => {
                setBrands(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the brands!", error);
            });

        axiosInstance.get('Categoire/getcategoire.php')
            .then(response => {
                setCategories(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });

        axiosInstance.get('Color/getcolor.php')
            .then(response => {
                setColors(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the colors!", error);
            });

        axiosInstance.get('Sex/getsex.php')
            .then(response => {
                setSexes(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the sexes!", error);
            });
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setImagePreview(product.Image[0]);
        setShow(true);
    };

    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        const updatedProduct = { ...currentProduct, [name]: value };
    
        // Update status based on the updated values
        if (updatedProduct.Quantity > 0) {
            updatedProduct.Status = updatedProduct.OfferPrice > 0 ? 'OnSale' : 'Available';
        } else {
            updatedProduct.Status = 'SoldOut';
        }
    
        setCurrentProduct(updatedProduct);
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

        const url = currentProduct.ProductID ? 'Products/updateproduct.php' : 'Products/addproduct.php';

        if (currentProduct.ProductID === null) {
            axiosInstance.get('Products/getlastid.php')
            .then(response => {
                const lastID = response.data.LastID;
                formData.append('ProductID', lastID + 1);
                formData.append('UserID', user.UserID);

                axiosInstance.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    fetchProducts();
                    setLoading(false);
                    handleCloseCallback();
                    setSelfMessage("Product added successfully!");
                    setSelfType("success");
                    setShowMessage(true);
                })
                .catch(error => {
                    setLoading(false);
                    setSelfMessage("There was an error saving the product!");
                    setSelfType("error");
                    setShowMessage(true);
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
                setSelfMessage("Product updated successfully!");
                setSelfType("success");
                setShowMessage(true);
            })
            .catch(error => {
                console.error("There was an error saving the product!", error);
                setLoading(false);
                setSelfMessage("There was an error saving the product!");
                setSelfType("error");
                setShowMessage(true);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axiosInstance.post('Products/deleteproduct.php', { ProductID: id })
                .then(response => {
                    fetchProducts();
                    setSelfMessage("Product deleted successfully!");
                    setSelfType("success");
                    setShowMessage(true);
                })
                .catch(error => {
                    setSelfMessage("There was an error deleting the product!");
                    setSelfType("error");
                    setShowMessage(true);
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
            UserID: null,
            Name: '',
            Description: '',
            Price: '',
            Quantity: '',
            Image: '',
            OfferPrice: '',
            BrandID: '',
            CategoryID: '',
            ColorID: '',
            SexID: '',
            Status: '',
        };
        setCurrentProduct(newProduct);
        setImagePreview('');
        setShow(true);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    const displayedProducts = products.slice(0, productsPerPage);

    return (
        <div className="products-container">
            {showMessage && (
                <MessageCard
                    type={selfType}
                    message={selfMessage}
                    onClose={handleCloseMessage}
                />
            )}
            <Sidebar />
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
                    <button onClick={handleAddProduct} className="add-button">
                        <FontAwesomeIcon icon={faPlus} />Add Product
                    </button>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Production Year</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Offer Price</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Color</th>
                                <th>Sex</th>
                                <th>User ID</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProducts.map(product => {
                                const formattedPrice = new Intl.NumberFormat().format(product.Price);
                                const formattedOfferPrice = new Intl.NumberFormat().format(product.OfferPrice);
                                const formattedQuantity = new Intl.NumberFormat().format(product.Quantity);

                                return (
                                    <tr key={product.ProductID}>
                                        <td>{product.ProductID}</td>
                                        <td>{product.Name}</td>
                                        <td>{product.Description}</td>
                                        <td>{product.ProductionYear}</td>
                                        <td>{formattedPrice}</td>
                                        <td>{formattedQuantity}</td>
                                        <td><img src={product.Image[0]} alt={product.Name} className="product-image" /></td>
                                        <td>{formattedOfferPrice}</td>
                                        <td>{brands.find(brand => brand.BrandID === product.BrandID)?.Name}</td>
                                        <td>{categories.find(category => category.CategoireID === product.CategoireID)?.Name}</td>
                                        <td>{colors.find(color => color.ColorID === product.ColorID)?.Name}</td>
                                        <td>{sexes.find(sex => sex.SexID === product.SexID)?.Name}</td>
                                        <td>{product.UserID}</td>
                                        <td>{product.Status}</td>
                                        <td><button className="edit-button" onClick={() => handleEdit(product)}>
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </button></td>
                                        <td><button className="delete-button" onClick={() => handleDelete(product.ProductID)}>
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
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
                <PopForm name={'Product'} show={show} handleClose={handleClose} handleSave={handleSave}>
                    <h2>{currentProduct.ProductID ? 'Edit Product' : 'Add Product'}</h2>
                    <form>
                        <label>
                            ID:
                            <input type="number" name="ProductID" value={currentProduct.ProductID || ''} onChange={handleChange} readOnly />
                        </label>
                        <label>
                            User ID:
                            <input type="number" name="UserID" value={currentProduct.UserID || ''} onChange={handleChange} readOnly />
                        </label>
                        <label>
                            Status:
                            <input type="text" name="Status" value={currentProduct.Status || ''} onChange={handleChange} readOnly />
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
                            Price:
                            <input type="number" name="Price" value={currentProduct.Price || ''} onChange={handleChange} />
                        </label>
                        <label>
                            Quantity:
                            <input type="number" name="Quantity" value={currentProduct.Quantity || ''} onChange={handleChange} />
                        </label>
                        <label>
                            Image:
                            <input type="file" name="Image" multiple onChange={handleImageChange} />
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
        </div>
    );
};

export default ShowProducts;
