import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Categories.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';
import Sidebar from "../SideBar/SideBar";

const ShowCategories = () => {
    const [Categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentCategorie, setCurrentCategorie] = useState({
        CategoireID: null,
        Name: '',
        Image: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const categoriesPerPage = 25;

    useEffect(() => {
        fetchCategories();
    }, [currentPage]);

    const fetchCategories = () => {
        axiosInstance.get(`Categoire/showcategoire_page.php?page=${currentPage + 1}&limit=${categoriesPerPage}`)
            .then(response => {
                setCategories(response.data.data || []);
                setFilteredCategories(response.data.data || []);
                setPageCount(Math.ceil(response.data.total / categoriesPerPage));
            })
            .catch(error => {
                console.error("There was an error fetching the Categories!", error);
            });
    };

    const handleEdit = (categorie) => {
        setCurrentCategorie(categorie);
        setImagePreview(categorie.Image);
        setShow(true);
    };

    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategorie({ ...currentCategorie, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentCategorie({ ...currentCategorie, Image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = (handleCloseCallback) => {
        setLoading(true);
        const formData = new FormData();
        for (const key in currentCategorie) {
            if (currentCategorie[key] !== null) {
                formData.append(key, currentCategorie[key]);
            }
        }

        const url = currentCategorie.CategoireID ? 'Categoire/updatecategoire.php' : 'Categoire/addcategoire.php';

        if (currentCategorie.CategoireID === null) {
            axiosInstance.get('Categoire/getlastid.php')
                .then(response => {
                    const lastID = response.data.LastID;
                    formData.append('CategoireID', lastID + 1);
                    axiosInstance.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        fetchCategories();
                        setLoading(false);
                        handleCloseCallback();
                    })
                    .catch(error => {
                        console.error("There was an error saving the category!", error);
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
                fetchCategories();
                setLoading(false);
                handleCloseCallback();
            })
            .catch(error => {
                console.error("There was an error saving the category!", error);
                setLoading(false);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            axiosInstance.post('Categoire/deletecategoire.php', { CategoireID: id })
            .then(response => {
                if (response.data.status === 'success') {
                    fetchCategories();
                    alert('Categorie deleted successfully.');
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.error("There was an error deleting the Categorie!", error);
            });
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = Categories.filter(categorie => 
            categorie.CategoireID.toString().includes(value) || 
            categorie.Name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    const handleAddCategory = () => {
        const newCategory = {
            CategoireID: null,  
            Name: '',
            Image: ''
        };
        setCurrentCategorie(newCategory);
        setImagePreview('');
        setShow(true);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayedCategories = filteredCategories.length > 0 ? filteredCategories.slice(0, categoriesPerPage) : [];

    return (
        <div className="Categories-container">
            <Sidebar />
            <div className="Categories-table">
                <h1>Categories List</h1>
                <input 
                    type="text" 
                    placeholder="Search by ID or Name" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="search-input" 
                />
                <div className="button-container">
                    <button onClick={handleAddCategory} className="add-button">Add Category</button>
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
                        {displayedCategories.map(categorie => (
                            <tr key={categorie.CategoireID}>
                                <td>{categorie.CategoireID}</td>
                                <td>{categorie.Name}</td>
                                <td><img src={categorie.Image} alt={categorie.Name} className="category-image" /></td>
                                <td><button onClick={() => handleEdit(categorie)}>Edit</button></td>
                                <td><button onClick={() => handleDelete(categorie.CategoireID)}>Delete</button></td>
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
                <PopForm name={'Category'} show={show} handleClose={handleClose} handleSave={handleSave}>
                    <h2>{currentCategorie.CategoireID ? 'Edit Categorie' : 'Add Categorie'}</h2>
                    <form>
                        <label>
                            ID:
                            <input type="number" name="CategoireID" value={currentCategorie.CategoireID || ''} onChange={handleChange} readOnly />
                        </label>
                        <label>
                            Name:
                            <input type="text" name="Name" value={currentCategorie.Name || ''} onChange={handleChange} />
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

export default ShowCategories;
