import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Brands.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';
import Sidebar from "../SideBar/SideBar";

const ShowBrands = () => {
    const [Brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false); // حالة التحميل
    const [currentBrand, setCurrentBrand] = useState({
        BrandID: null,
        Name: '',
        Image: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const brandsPerPage = 25;

    useEffect(() => {
        fetchBrands();
    }, [currentPage]);

    const fetchBrands = () => {
        axiosInstance.get(`Brand/showbrand_page.php?page=${currentPage + 1}&limit=${brandsPerPage}`)
            .then(response => {
                setBrands(response.data.data || []);
                setFilteredBrands(response.data.data || []);
                setPageCount(Math.ceil(response.data.total / brandsPerPage));
            })
            .catch(error => {
                console.error("There was an error fetching the Brands!", error);
            });
    };

    const handleEdit = (brand) => {
        setCurrentBrand(brand);
        setImagePreview(brand.Image);
        setShow(true);
    };

    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentBrand({ ...currentBrand, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentBrand({ ...currentBrand, Image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = (handleCloseCallback) => {
        setLoading(true);
        console.log("Current Brand:", currentBrand);
        const formData = new FormData();
        for (const key in currentBrand) {
            if (currentBrand[key] !== null) {
                formData.append(key, currentBrand[key]);
            }
        }

        const url = currentBrand.BrandID ? 'Brand/updatebrand.php' : 'Brand/addbrand.php';

        console.log("URL:", url);
        console.log("FormData:", ...formData);

        if (currentBrand.BrandID === null) {
            axiosInstance.get('Brand/getlastid.php')
                .then(response => {
                    const lastID = response.data.LastID;
                    formData.append('BrandID', lastID + 1);
                    console.log("FormData for Add:", ...formData);
                    axiosInstance.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        fetchBrands();
                        setLoading(false);
                        handleCloseCallback();
                    })
                    .catch(error => {
                        console.error("There was an error saving the brand!", error);
                        setLoading(false);
                    });
                })
                .catch(error => {
                    console.error("There was an error fetching the last ID!", error);
                    setLoading(false);
                });
        } else {
            console.log("FormData for Update:", ...formData);
            axiosInstance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                fetchBrands();
                setLoading(false);
                handleCloseCallback();
            })
            .catch(error => {
                console.error("There was an error saving the brand!", error);
                setLoading(false);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            axiosInstance.post('Brand/deletebrand.php', { BrandID: id })
                .then(response => {
                    if (response.data.status === 'success') {
                        fetchBrands();
                        alert('Brand deleted successfully.');
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    console.error("There was an error deleting the brand!", error);
                });
        }
    };
    

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = Brands.filter(brand => 
            brand.BrandID.toString().includes(value) || 
            brand.Name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBrands(filtered);
    };

    const handleAddBrand = () => {
        const newBrand = {
            BrandID: null,
            Name: '',
            Image: ''
        };
        setCurrentBrand(newBrand);
        setImagePreview('');
        setShow(true);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayedBrands = filteredBrands.length > 0 ? filteredBrands.slice(0, brandsPerPage) : [];

    return (
        <div className="Brands-container">
            <Sidebar />
        
        <div className="Brands-table">
            <h1>Brands List</h1>
            <input 
                type="text" 
                placeholder="Search by ID or Name" 
                value={searchTerm} 
                onChange={handleSearch} 
                className="search-input" 
            />
            <div className="button-container">
                <button onClick={handleAddBrand} className="add-button">Add Brand</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedBrands.map(brand => (
                        <tr key={brand.BrandID}>
                            <td>{brand.BrandID}</td>
                            <td>{brand.Name}</td>
                            <td><img src={brand.Image} alt={brand.Name} className="category-image" /></td>
                            <td><button onClick={() => handleEdit(brand)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(brand.BrandID)}>Delete</button></td>
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
                <PopForm name={'Brand'}  show={show} handleClose={handleClose} handleSave={() => handleSave(handleClose)}>
                <h2>{currentBrand.BrandID ? 'Edit Brand' : 'Add Brand'}</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="BrandID" value={currentBrand.BrandID || ''} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentBrand.Name || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Image:
                        <input type="file" name="Image" onChange={handleImageChange} />
                    </label>
                    {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                </form>
            </PopForm>
        </div>
        </div>
    );
};

export default ShowBrands;