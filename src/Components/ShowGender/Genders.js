import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Genders.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';
import Sidebar from "../SideBar/SideBar";

const ShowGenders = () => {
    const [Genders, setGenders] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentGender, setCurrentGender] = useState({
        SexID: null,
        Name: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const gendersPerPage = 10;

    useEffect(() => {
        fetchGenders();
    }, [currentPage]);

    const fetchGenders = () => {
        axiosInstance.get(`Sex/showgender_page.php?page=${currentPage + 1}&limit=${gendersPerPage}`)
            .then(response => {
                setGenders(response.data.data || []);
                setPageCount(Math.ceil(response.data.total / gendersPerPage));
            })
            .catch(error => {
                console.error("There was an error fetching the Genders!", error);
            });
    };

    const handleEdit = (Gender) => {
        setCurrentGender(Gender);
        setShow(true);
    };

    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentGender({ ...currentGender, [name]: value });
    };

    const handleSave = (handleCloseCallback) => {
        setLoading(true);
        const url = currentGender.SexID ? 'Sex/updategender.php' : 'Sex/addgender.php';
        const data = {
            SexID: currentGender.SexID,
            Name: currentGender.Name
        };

        axiosInstance.post(url, data)
            .then(response => {
                fetchGenders();
                setLoading(false);
                handleCloseCallback();
            })
            .catch(error => {
                console.error("There was an error saving the Gender!", error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this gender?")) {
            axiosInstance.post('Sex/deletegender.php', { SexID: id })
            .then(response => {
                if (response.data.status === 'success') {
                    fetchGenders();
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
            fetchGenders();
        } else {
            const filtered = Genders.filter(Gender => 
                Gender.SexID.toString().includes(value) || 
                Gender.Name.toLowerCase().includes(value.toLowerCase())
            );
            setGenders(filtered);
        }
    };

    const handleAddGender = () => {
        const newGender = {
            SexID: null,
            Name: ''
        };
        setCurrentGender(newGender);
        setShow(true);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayedGenders = Genders.slice(0, gendersPerPage);

    return (
        <div className="Gender-container">
            <Sidebar />
        
        <div className="Genders-table">
            <h1>Genders List</h1>
            <input 
                type="text" 
                placeholder="Search by ID or Name" 
                value={searchTerm} 
                onChange={handleSearch} 
                className="search-input" 
            />
            <div className="button-container">
                <button onClick={handleAddGender} className="add-button">Add Gender</button>
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
                    {displayedGenders.map(Gender => (
                        <tr key={Gender.SexID}>
                            <td>{Gender.SexID}</td>
                            <td>{Gender.Name}</td>
                            <td><button onClick={() => handleEdit(Gender)}>Edit</button></td>
                            <td><button onClick={() => handleDelete(Gender.SexID)}>Delete</button></td>
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
                <h2>{currentGender.SexID ? 'Edit Gender' : 'Add Gender'}</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="SexID" value={currentGender.SexID || ''} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentGender.Name || ''} onChange={handleChange} />
                    </label>
                </form>
            </PopForm>
            </div>
            </div>
    );
};

export default ShowGenders;