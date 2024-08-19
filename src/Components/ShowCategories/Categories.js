import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Categories.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';
import Sidebar from "../SideBar/SideBar";
import MessageCard from '../AlertMessage/Message';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ShowCategories = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [selfType, setSelfType] = useState("");
    const [selfMessage, setSelfMessage] = useState("");
    const handleCloseMessage = () => {
        setShowMessage(false);
    };
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
                setSelfMessage("There was an error fetching the Categories!");
                setSelfType("error");
                setShowMessage(true);
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
                        setSelfMessage("Category Added successfully!");
                        setSelfType("success");
                        setShowMessage(true);
                        fetchCategories();
                        setLoading(false);
                        handleCloseCallback();
                    })
                    .catch(error => {
                        setSelfMessage("There was an error saving the category!", error);
                        setSelfType("error");
                        setShowMessage(true);
                        setLoading(false);
                    });
                })
                .catch(error => {
                    setSelfMessage("There was an error fetching the last ID!", error);
                    setSelfType("error");
                    setShowMessage(true);
                    setLoading(false);
                });
        } else {
            axiosInstance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                setSelfMessage("Category updated successfully!");
                setSelfType("success");
                setShowMessage(true);
                fetchCategories();
                setLoading(false);
                handleCloseCallback();
            })
            .catch(error => {
                setSelfMessage("There was an error saving the category!", error);
                setSelfType("error");
                setShowMessage(true);
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
                    setSelfMessage("Categorie deleted successfully!");
                    setSelfType("success");
                    setShowMessage(true);
                } else {
                    setSelfMessage(response.data.message);
                    setSelfType("error");
                    setShowMessage(true);
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
            {showMessage&&<MessageCard
                type={selfType}
                message={selfMessage}
                onClose={handleCloseMessage}
            />}
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
                    <button onClick={handleAddCategory} className="add-button">
                        <FontAwesomeIcon icon={faPlus} />Add Category
                    </button>
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
                                <td><button onClick={() => handleEdit(categorie)} className="edit-button">
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button></td>
                                <td><button onClick={() => handleDelete(categorie.CategoireID)} className="delete-button">
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button></td>
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
