import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Account.css';
import { useSelector } from 'react-redux';

const AccountDetails = () => {
    const user = useSelector((state) => state.user.user);
    const [userdetails, setUserDetails] = useState({
        userID: '',
        userName: '',
        password: '',
        email: '',
        profileImage: ''
    });
    const [originalUser, setOriginalUser] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchUserDetails();
    }, [user.ID]);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost/dashboard/luxury-site-last/api/User/getUserDetails.php?userID=${user.ID}`);
            const data = await response.json();
            if (data.status === 'success') {
                console.log(data);
                const fetchedUser = {
                    userID: data.user.UserID || '',
                    userName: data.user.UserName || '',
                    password: data.user.Password || '',
                    email: data.user.Email || '',
                    profileImage: data.user.ProfileImage || ''
                };
                setUserDetails(fetchedUser);
                setOriginalUser(fetchedUser);
            } else {
                console.error('Failed to fetch user details');
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
                    profileImage: reader.result
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
            const response = await fetch('http://localhost/dashboard/luxury-site-last/api/User/updateUserDetails.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userdetails)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.status === 'success') {
                console.log('User details updated successfully');
                setOriginalUser(userdetails);
                setHasChanges(false);
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
        setUserDetails(prevState => ({ ...prevState, profileImage: '' }));
        setHasChanges(true);
    };

    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={8} className="account-container">
                    <h2>Account Details</h2>
                    <div className="profile-image-container mb-4">
                        <img
                            src={userdetails.profileImage}
                            alt="Profile"
                            className="profile-image"
                        />
                        <div className="ms-3">
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
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
                                    name="userName"
                                    value={userdetails.userName}
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
                                    name="email"
                                    value={userdetails.email}
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
                                        name="password"
                                        value={userdetails.password}
                                        autoComplete="off"
                                        onChange={handleChange}
                                    />
                                    <span onClick={toggleShowPassword} className="toggle-password">
                                        {showPassword ? "Hide" : "Show"}
                                    </span>
                                </div>
                            </Col>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit">Save Changes</Button>
                            {hasChanges && <Button variant="secondary" onClick={handleCancel}>Cancel</Button>}
                            <Button variant="danger">Delete Account</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountDetails;
