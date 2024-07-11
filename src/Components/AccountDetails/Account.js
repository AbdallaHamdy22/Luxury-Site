import React, { useState } from 'react';
import './Account.css';

const AccountDetails = () => {
    const [userDetails, setUserDetails] = useState({
        userID: 1,
        userName: 'John Doe',
        password: 'password123',
        email: 'john.doe@example.com',
        profileImage: '/Images/bag1.jpg'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserDetails(prevState => ({
                    ...prevState,
                    profileImage: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', userDetails);
    };

    return (
        <div className="account-container">
            <h2>Account Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="profile-image-container">
                        <img src={userDetails.profileImage} alt="Profile" className="profile-image" />
                    </div>
                    <label htmlFor="profileImage">Change Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userDetails.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default AccountDetails;
