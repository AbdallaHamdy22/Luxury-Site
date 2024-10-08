import React, { useState, useEffect } from 'react';
import './Upbtn.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    };

    return (
        <button
        className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        >
        <i className="fa fa-arrow-up"></i>
        </button>
    );
};

export default ScrollToTopButton;
