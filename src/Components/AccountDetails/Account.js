import React, { useState, useEffect } from 'react';
import './Account.css';

const AccountDetails = () => {
    const [user, setUserDetails] = useState({
        userID: '',
        userName: '',
        password: '',
        email: '',
        profileImage: ''
    });

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('http://localhost/dashboard/LUXURY-SITE/User/getUserDetails.php?userID=1');
            const data = await response.json();
            console.log(data.user);
            if (data.status === 'success') {
                setUserDetails({
                    userID: data.user.userID || '',
                    userName: data.user.userName || '',
                    password: data.user.password || '',
                    email: data.user.email || '',
                    profileImage: data.user.profileImage || ''
                });
                console.log("mewo".user);
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/dashboard/LUXURY-SITE/User/updateUserDetails.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log('User details updated successfully');
            } else {
                console.error('Failed to update user details');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <div className="account-container">
            <h2>Account Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="profile-image-container">
                        <img src={user.profileImage} alt="Profile" className="profile-image" />
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
                        value={user.userName}
                        autoComplete='off'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        autoComplete='off'
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        autoComplete='off'
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default AccountDetails;
