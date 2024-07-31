import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import './userDetails.css';
import WithDrawed from './returned';
import Submitted from './Submitted';
import Recieved from './recieved';
import Archived from './archived';
import OnSale from './onSale';
import Sold from './Sold';
import axiosInstance from '../../axiosConfig/instance';

const UserDetails = () => {
    const [openItem, setOpenItem] = useState(null);
    const { category } = useParams();
    const navigate = useNavigate();
    const [submitted,setSubmitted] = useState([]);
    useEffect(() => {
        axiosInstance.get('Products/getproduct.php')
            .then(response => {
                setSubmitted()
            })
            .catch(error => console.error('Error fetching products:', error));
        
        if (!category) {
            navigate('/userDetails/submitted');
        }
    }, [category, navigate]);

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    const renderItems = () => {
        switch (category) {
            case 'submitted':
                return <Submitted toggleItem={toggleItem} openItem={openItem} />;
            case 'received':
                return <Recieved toggleItem={toggleItem} openItem={openItem} />;
            case 'on-sale':
                return <OnSale toggleItem={toggleItem} openItem={openItem} />;
            case 'sold':
                return <Sold toggleItem={toggleItem} openItem={openItem} />;
            case 'returned-withdrawn':
                return <WithDrawed toggleItem={toggleItem} openItem={openItem} />;
            case 'archived':
                return <Archived toggleItem={toggleItem} openItem={openItem} />;
            default:
                return <p>No items found.</p>;
        }
    };

    return (
        <div className="my-items">
            <h1>My Items</h1>
            <div className="tabs">
                <button className={`tab ${category === 'submitted' ? 'active' : ''}`} onClick={() => navigate('/userDetails/submitted')}>Item(s) Submitted</button>
                <button className={`tab ${category === 'received' ? 'active' : ''}`} onClick={() => navigate('/userDetails/received')}>Item(s) Received</button>
                <button className={`tab ${category === 'on-sale' ? 'active' : ''}`} onClick={() => navigate('/userDetails/on-sale')}>On Sale</button>
                <button className={`tab ${category === 'sold' ? 'active' : ''}`} onClick={() => navigate('/userDetails/sold')}>Sold</button>
                <button className={`tab ${category === 'returned-withdrawn' ? 'active' : ''}`} onClick={() => navigate('/userDetails/returned-withdrawn')}>Item(s) Returned/Withdrawn</button>
                <button className={`tab ${category === 'archived' ? 'active' : ''}`} onClick={() => navigate('/userDetails/archived')}>Archived</button>
            </div>
            {renderItems()}
        </div>
    );
};

export default UserDetails;
