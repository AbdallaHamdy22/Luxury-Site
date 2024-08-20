import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './users.css';
import PopForm from '../popUpform/popForm';
import ReactPaginate from 'react-paginate';
import Sidebar from "../SideBar/SideBar";
import { useSelector } from 'react-redux';
import MessageCard from '../AlertMessage/Message';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShowUsers = () => {
    const user = useSelector((state) => state.user.user);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [currentuser, setCurrentUser] = useState({
        UserID: null,
        UserName: '',
        Password: '',
        Email: '',
        ProfileProfileImage: '',
        RoleID: '',
    });
    const [ProfileImagePreview, setProfileImagePreview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [selfMessage, setSelfMessage] = useState('');
    const [selfType, setSelfType] = useState(''); 
    const usersPerPage = 10;

    useEffect(() => {
        fetchusers();
        fetchAuxiliaryData();
    }, [currentPage]);

    const fetchusers = () => {
        axiosInstance.get(`User/showuser_page.php?page=${currentPage + 1}&limit=${usersPerPage}`)
            .then(response => {
                setUsers(response.data.data || []);
                         
                setPageCount(Math.ceil(response.data.total / usersPerPage));
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
            });
    };

    const fetchAuxiliaryData = () => {
        axiosInstance.get('Roles/')
            .then(response => {
                setRoles(response.data || []);
                
                
            })
            .catch(error => {
                console.error("There was an error fetching the roles!", error);
            });
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setProfileImagePreview(user.ProfileImage[0]);
        setShow(true);
    };

    const handleClose = () => {
        if (!loading) {
            setShow(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentuser, [name]: value });
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentUser({ ...currentuser, ProfileImage: file });
            setProfileImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = (handleCloseCallback) => {
        setLoading(true);
        const formData = new FormData();
        for (const key in currentuser) {
            if (currentuser[key] !== null) {
                formData.append(key, currentuser[key]);
            }
        }

        const url = currentuser.UserID ? 'User/updateuserdetails.php' : 'User/adduser.php';

        if (currentuser.UserID === null) {
            axiosInstance.get('User/getlastid.php')
            .then(response => {
                const lastID = response.data.LastID;
                formData.append('UserID', lastID + 1);

                axiosInstance.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    fetchusers();
                    setLoading(false);
                    handleCloseCallback();
                    setSelfMessage("User added successfully!");
                    setSelfType("success");
                    setShowMessage(true);
                })
                .catch(error => {
                    setLoading(false);
                    setSelfMessage("There was an error saving the User!");
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
                fetchusers();
                setLoading(false);
                handleCloseCallback();
                setSelfMessage("User updated successfully!");
                setSelfType("success");
                setShowMessage(true);
            })
            .catch(error => {
                console.error("There was an error saving the User!", error);
                setLoading(false);
                setSelfMessage("There was an error saving the User!");
                setSelfType("error");
                setShowMessage(true);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this User?")) {
            axiosInstance.post('User/deleteuser.php', { UserID: id })
                .then(response => {
                    fetchusers();
                    setSelfMessage("User deleted successfully!");
                    setSelfType("success");
                    setShowMessage(true);
                })
                .catch(error => {
                    setSelfMessage("There was an error deleting the user!");
                    setSelfType("error");
                    setShowMessage(true);
                });
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value === "") {
            fetchusers();
        } else {
            const filtered = users.filter(user => 
                user.UserID.toString().includes(value) || 
                user.Name.toLowerCase().includes(value.toLowerCase())
            );
            setUsers(filtered);
        }
    };

    const handleAddUser = () => {
        const newUser = {
            UserID: null,
            UserName: '',
            Password: '',
            Email: '',
            ProfileProfileImage: '',
            RoleID: '',
        };
        setCurrentUser(newUser);
        setProfileImagePreview('');
        setShow(true);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    const displayedusers = users.slice(0, usersPerPage);

    return (
        <div className="users-container">
            {showMessage && (
                <MessageCard
                    type={selfType}
                    message={selfMessage}
                    onClose={handleCloseMessage}
                />
            )}
        <Sidebar />
        <div className="user-table">
            <h1>Users List</h1>
            <input
                type="text" 
                placeholder="Search by ID or Name" 
                value={searchTerm} 
                onChange={handleSearch} 
                className="search-input" 
            />
            <div className="button-container">
                <button onClick={handleAddUser} className="add-button">
                    <FontAwesomeIcon icon={faPlus} />Add User
                </button>
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Profile Image</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedusers.map(User => (
                            <tr key={User.UserID}>
                                <td>{User.UserID}</td>
                                <td>{User.UserName}</td>
                                <td>{User.Email}</td>
                                <td><img src={User.ProfileImage} alt={User.Name} className="User-ProfileImage" /></td>
                                <td>{roles.find(role => role.RoleID === User.RoleID)?.RoleName}</td>
                                <td><button className="edit-button" onClick={() => handleEdit(User)}>
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button></td>
                                <td><button className="delete-button" onClick={() => handleDelete(User.UserID)}>
                                <FontAwesomeIcon icon={faTrash} /> Delete
                                </button></td>
                            </tr>
                        ))}
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
            <PopForm name={'User'} show={show} handleClose={handleClose} handleSave={handleSave}>
                <h2>{currentuser.UserID ? 'Edit User' : 'Add User'}</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="UserID" value={currentuser.UserID || ''} onChange={handleChange} />
                    </label>
                    <label>
                        UserName:
                        <input type="text" name="UserName" value={currentuser.UserName || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="Email" value={currentuser.Email || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Profile Image:
                        <input type="file" name="ProfileImage" multiple onChange={handleProfileImageChange} />
                    </label>
                    {ProfileImagePreview && <img src={ProfileImagePreview} alt="Preview" className="image-preview" />}
                    <label>
                        Role:
                        <select name="RoleID" value={currentuser.RoleID || ''} onChange={handleChange}>
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role.RoleID} value={role.RoleID}>{role.RoleName}</option>
                            ))}
                        </select>
                    </label>
                </form>
            </PopForm>
            </div>
            </div>
    );
};

export default ShowUsers;