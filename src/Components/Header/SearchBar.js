import React, { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import axiosInstance from './../../axiosConfig/instance';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [abortController, setAbortController] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };
    
    const debouncedSearch = useCallback(
        debounce((value) => {
            if (value.trim().length > 0) {
                search(value);
            } else {
                setResults([]);
            }
        }, 300),
        []
    );

    const search = (query) => {
        if (abortController) {
            abortController.abort();
        }

        const controller = new AbortController();
        setAbortController(controller);

        axiosInstance
            .get(`Brand/searchbrand.php?query=${query}`, {
                signal: controller.signal,
            })
            .then((response) => {
                displayResults(response.data, 'Brand');
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Previous request aborted:', error.message);
                } else {
                    console.error('Error fetching brands:', error);
                }
            });

        axiosInstance
            .get(`Products/searchproduct.php?query=${query}`, {
                signal: controller.signal,
            })
            .then((response) => {
                displayResults(response.data, 'Product');
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Previous request aborted:', error.message);
                } else {
                    console.error('Error fetching products:', error);
                }
            });
    };

    const displayResults = (data, type) => {
        const formattedResults = data.map((item) => {
            let images = item.Image;

            if (images) {
                images = images.split(',');
            }

            return {
                type,
                name: item.Name,
                image: images ? images[0] : '',
                link: item.link,
            };
        });
        setResults((prevResults) => [...prevResults, ...formattedResults]);
    };

    const handleResultClick = (link) => {
        navigate(link, { replace: true });
        setIsFocused(false);
    };

    return (
        <div className="search-bar-container">
            <div className="input-group search-container">
                <div className="search-icon">
                    <FaSearch />
                </div>
                <input
                    className="form-control search-bar"
                    type="search"
                    placeholder="What are you looking for?"
                    aria-label="Search"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                />
            </div>
            {isFocused && results.length > 0 && (
                <div className="search-results">
                    {results.map((result, index) => (
                        <div
                            className="search-result-item"
                            key={index}
                            onClick={() => handleResultClick(result.link)}
                        >
                            {result.image && <img src={result.image} alt={result.name} />}
                            {result.type}: {result.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
