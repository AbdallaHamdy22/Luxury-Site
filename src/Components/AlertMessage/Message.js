import React, { useState, useEffect } from 'react';
import './Message.css';

const MessageCard = ({ type, message, onClose = () => {} }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    return (
        <div className={`message-card ${type} ${isVisible ? 'show' : 'hide'}`}>
            <div className="card-body">
                <h4 className="card-header">
                    {type === 'success' && 'Success!'}
                    {type === 'error' && 'Error!'}
                    {type === 'info' && 'Info!'}
                </h4>
                <p className="card-text">{message}</p>
                <button className="ok-button" onClick={handleClose}>OK</button>
            </div>
        </div>
    );
};

export default MessageCard;
