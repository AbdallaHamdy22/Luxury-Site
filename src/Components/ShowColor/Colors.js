import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Colors.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';
import Sidebar from "../SideBar/SideBar";

const ShowColors = () => {
    const [Colors, setColors] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentColor, setCurrentColor] = useState({
        Color_ID: null,
        Name: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const ColorsPerPage = 10;

    useEffect(() => {
        fetchColors();
    }, [currentPage]);

    const fetchColors = () => {
        axiosInstance.get(`http://localhost/dashboard/LUXURY-SITE/Color/showcolor_page.php?page=${currentPage + 1}&limit=${ColorsPerPage}`)
            .then(response => {
                setColors(response.data.data || []);
                setPageCount(Math.ceil(response.data.total / ColorsPerPage));
            })
            .catch(error => {
                console.error("There was an error fetching the Colors!", error);
            });
    };

    const handleEdit = (Color) => {
        setCurrentColor(Color);
        setShow(true);
    };

    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentColor({ ...currentColor, [name]: value });
    };

    const handleSave = (handleCloseCallback) => {
        setLoading(true);
        const url = currentColor.Color_ID ? 'http://localhost/dashboard/LUXURY-SITE/Color/updateColor.php' : 'http://localhost/dashboard/LUXURY-SITE/Color/addColor.php';
        const data = {
            Color_ID: currentColor.Color_ID,
            Name: currentColor.Name
        };

        axiosInstance.post(url, data)
            .then(response => {
                fetchColors();
                setLoading(false);
                handleCloseCallback();
            })
            .catch(error => {
                console.error("There was an error saving the Color!", error);
                setLoading(false);
            });
    };

    const handleDelete = (Color_ID) => {
        if (window.confirm("Are you sure you want to delete this Color?")) {
            
            axiosInstance.post('http://localhost/dashboard/LUXURY-SITE/Color/deleteColor.php', { Color_ID: Color_ID })
            .then(response => {
                if (response.data.status === 'success') {
                    fetchColors();
                    alert('Gender deleted successfully.');
                } else {
                    // console.log(response.data.message);
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.error("There was an error deleting the Gender!", error);
            });
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value === "") {
            fetchColors();
        } else {
            const filtered = Colors.filter(Color => 
                Color.Color_ID.toString().includes(value) || 
                Color.Name.toLowerCase().includes(value.toLowerCase())
            );
            setColors(filtered);
        }
    };

    const handleAddColor = () => {
        const newColor = {
            Color_ID: null,
            Name: ''
        };
        setCurrentColor(newColor);
        setShow(true);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayedColors = Colors.slice(0, ColorsPerPage);

    return (
        <div className="Colors-container">
            <Sidebar />
        
        <div className="Colors-table">
            <h1>Colors List</h1>
            <input 
                type="text" 
                placeholder="Search by ID or Name" 
                value={searchTerm} 
                onChange={handleSearch} 
                className="search-input" 
            />
            <div className="button-container">
                <button onClick={handleAddColor} className="add-button">Add Color</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedColors.map(Color => (
                        <tr key={Color.Color_ID}>
                            <td>{Color.Color_ID}</td>
                            <td>{Color.Name}</td>
                            <td><button onClick={() => handleEdit(Color)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(Color.Color_ID)}>Delete</button></td>
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
                <h2>{currentColor.Color_ID ? 'Edit Color' : 'Add Color'}</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="Color_ID" value={currentColor.Color_ID || ''} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentColor.Name || ''} onChange={handleChange} />
                    </label>
                </form>
            </PopForm>
            </div>
            </div>
    );
};

export default ShowColors;