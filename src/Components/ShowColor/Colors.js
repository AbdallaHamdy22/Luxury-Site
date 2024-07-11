import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Colors.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';

const ShowColors = () => {
    const [Colors, setColors] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentColor, setCurrentColor] = useState({
        ColorID: null,
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
        axiosInstance.get(`http://localhost/dashboard/LUXURY-SITE/Color/getcolor.php?page=${currentPage + 1}&limit=${ColorsPerPage}`)
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
        const url = currentColor.ColorID ? 'http://localhost/dashboard/LUXURY-SITE/Color/updateColor.php' : 'http://localhost/dashboard/LUXURY-SITE/Color/addColor.php';
        const data = {
            ColorID: currentColor.ColorID,
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

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Color?")) {
            axiosInstance.post('http://localhost/dashboard/LUXURY-SITE/Color/deleteColor.php', { ColorID: id })
                .then(response => {
                    fetchColors();
                })
                .catch(error => {
                    console.error("There was an error deleting the Color!", error);
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
                Color.ColorID.toString().includes(value) || 
                Color.Name.toLowerCase().includes(value.toLowerCase())
            );
            setColors(filtered);
        }
    };

    const handleAddColor = () => {
        const newColor = {
            ColorID: null,
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
                        <tr key={Color.ColorID}>
                            <td>{Color.ColorID}</td>
                            <td>{Color.Name}</td>
                            <td><button onClick={() => handleEdit(Color)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(Color.ColorID)}>Delete</button></td>
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
                <h2>{currentColor.ColorID ? 'Edit Color' : 'Add Color'}</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="ColorID" value={currentColor.ColorID || ''} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentColor.Name || ''} onChange={handleChange} />
                    </label>
                </form>
            </PopForm>
        </div>
    );
};

export default ShowColors;