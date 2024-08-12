import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import './userDetails.css';
import Submitted from './Submitted';
import OnSale from './onSale';
import Sold from './Sold';
import axiosInstance from '../../axiosConfig/instance';
import { useSelector } from 'react-redux';
import Available from './Available';
import Archived from './archived';

const UserDetails = () => {
    const user = useSelector((state) => state.user.user);
    const [openItem, setOpenItem] = useState(null);
    const { category } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        axiosInstance.get('Products/getproduct.php')
            .then(response => {
                let data = response.data.filter(item => item.UserID === user.UserID);
                setItems(data)
            })
            .catch(error => console.error('Error fetching products:', error));
        
        if (!category) {
            navigate('/userDetails/Available');
        }
    }, [category, navigate, user.UserID]);

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    const renderItems = () => {
        if (items.length > 0) {
            switch (category) {
                case 'Available':
                    return <Available items={items.filter(item => item.Status === 'Available')} toggleItem={toggleItem} openItem={openItem} />;
                case 'Submitted':
                    return <Submitted items={items.filter(item => item.Status === 'Submitted')} toggleItem={toggleItem} openItem={openItem} />;
                case 'OnSale':
                    return <OnSale items={items.filter(item => item.Status === 'OnSale')} toggleItem={toggleItem} openItem={openItem} />;
                case 'Sold':
                    return <Sold items={items.filter(item => item.Status === 'Sold')} toggleItem={toggleItem} openItem={openItem} />;
                case 'Archived':
                    return <Archived items={items.filter(item => item.Status === 'Archived')} toggleItem={toggleItem} openItem={openItem} />;
                default:
                    return <p>No items found.</p>;
            }
        }
    };

    return (
        <div className="my-items">
            <h1>My Items</h1>
            <div className="tabs">
                <button className={`tab ${category === 'Available' ? 'active' : ''}`} onClick={() => navigate('/userDetails/Available')}>Item(s) Available</button>
                <button className={`tab ${category === 'Submitted' ? 'active' : ''}`} onClick={() => navigate('/userDetails/Submitted')}>Item(s) Submitted</button>
                <button className={`tab ${category === 'OnSale' ? 'active' : ''}`} onClick={() => navigate('/userDetails/OnSale')}>Item(s) On Sale</button>
                <button className={`tab ${category === 'Sold' ? 'active' : ''}`} onClick={() => navigate('/userDetails/Sold')}>Item(s) Sold</button>
                <button className={`tab ${category === 'Archived' ? 'active' : ''}`} onClick={() => navigate('/userDetails/Archived')}>Item(s) Archived</button>
            </div>
            {renderItems()}
        </div>
    );
};

export default UserDetails;
