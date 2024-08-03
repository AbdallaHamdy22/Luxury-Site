import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Account.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../Redux/RDXUser';
import axiosInstance from '../../axiosConfig/instance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AccountDetails = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [userdetails, setUserDetails] = useState({
        Email: '',
        Password: '',
        ProfileImage: '',
        RoleID: 0,
        UserID: 0,
        UserName: '',
    });

    const [originalUser, setOriginalUser] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user && user.UserID) {
            fetchUserDetails(user.UserID);
        }
    }, [user.UserID]);

    const fetchUserDetails = async (userID) => {
        try {
            const response = await axiosInstance.get(`User/getUserDetails.php?userID=${userID}`);
            const data = response.data;
            if (data.status === 'success') {
                const fetchedUser = {
                    Email: data.user.Email || '',
                    Password: data.user.Password || '',
                    ProfileImage: data.user.ProfileImage || '',
                    RoleID: data.user.RoleID || 0,
                    UserID: data.user.UserID || 0,
                    UserName: data.user.UserName || '',
                };
                setUserDetails(fetchedUser);
                setOriginalUser(fetchedUser);
            } else {
                console.error('Failed to fetch user details:', data.message);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => {
            const updatedUser = {
                ...prevState,
                [name]: value
            };
            setHasChanges(JSON.stringify(updatedUser) !== JSON.stringify(originalUser));
            return updatedUser;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedUser = {
                    ...userdetails,
                    ProfileImage: reader.result
                };
                setUserDetails(updatedUser);
                setHasChanges(JSON.stringify(updatedUser) !== JSON.stringify(originalUser));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('User/updateUserDetails.php', userdetails, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            if (data.status === 'success') {
                setOriginalUser(userdetails);
                setHasChanges(false);
                dispatch(setUser(userdetails));
            } else {
                console.error('Failed to update user details:', data.message);
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    const handleCancel = () => {
        setUserDetails(originalUser);
        setHasChanges(false);
    };

    const handleRemove = () => {
        setUserDetails(prevState => ({ ...prevState, ProfileImage: '' }));
        setHasChanges(true);
    };

    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <Container className="acc my-4">
            <Row className="justify-content-center">
                <Col md={8} className="account-container">
                    <h2>Account Details</h2>
                    <div className="profile-image-container mb-4">
                        <img
                            src={userdetails.ProfileImage}
                            alt="Profile"
                            className="profile-image"
                        />
                        <div className="ms-3">
                            <input
                                type="file"
                                id="profileImage"
                                name="ProfileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <Button variant="outline-primary" className="me-2" onClick={() => document.getElementById('profileImage').click()}>Upload</Button>
                            <Button variant="outline-danger" onClick={handleRemove}>Remove</Button>
                        </div>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Username</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="UserName"
                                    value={userdetails.UserName}
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="email"
                                    name="Email"
                                    value={userdetails.Email}
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPassword">
                            <Form.Label column sm={2}>Password</Form.Label>
                            <Col sm={10}>
                                <div className="password-wrapper">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="Password"
                                        value={userdetails.Password}
                                        autoComplete="off"
                                        onChange={handleChange}
                                    />
                                    <span onClick={toggleShowPassword} className="toggle-password">
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </Col>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            {hasChanges && <Button variant="outline-primary" type="submit">Save Changes</Button>}
                            {hasChanges && <Button variant="outline-danger" onClick={handleCancel}>Cancel</Button>}
                            <Button variant="outline-danger">Delete Account</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountDetails;
