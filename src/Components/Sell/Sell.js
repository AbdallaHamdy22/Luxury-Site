import './Sell.css';
import { useState } from 'react';

const Sell = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        offerPrice: ''
    });
    const [imageFiles, setImageFiles] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        data.append('offerPrice', formData.offerPrice);
    
        for (let i = 0; i < imageFiles.length; i++) {
            data.append('images[]', imageFiles[i]);
        }
    
        fetch('http://localhost/backend/uploaditem.php', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            console.log('Form submitted', result);
            if (result.status === 'success') {
                alert(result.message);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    offerPrice: '',
                });
                setImageFiles([]);
            } else {
                alert('Error: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form');
        });
    };
    
    return (
        <div className='sell-container'>
            <h1 className='sell-header'>Sell Your Product Now!</h1>
            <form className='sell-form' onSubmit={handleSubmit}>
                <label htmlFor='name'>Product Name</label>
                <input
                    name='name'
                    type='text'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor='description'>Product Description</label>
                <textarea
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <label htmlFor='price'>Product Price</label>
                <input
                    name='price'
                    type='number'
                    step='0.01'
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <label htmlFor='quantity'>Quantity</label>
                <input
                    name='quantity'
                    type='number'
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
                <label htmlFor='images'>Images</label>
                <input
                    name='images'
                    type='file'
                    multiple
                    onChange={handleFileChange}
                    required
                />
                <label htmlFor='offerPrice'>Offer Price</label>
                <input
                    name='offerPrice'
                    type='number'
                    step='0.01'
                    value={formData.offerPrice}
                    onChange={handleChange}
                />
                <select name="Categories" id="Cat">
                    <option value="" disabled selected hidden>Categories</option>
                    <option value="Watches">Watches</option>
                    <option value="Bags">Bags</option>
                </select>
                <select name="Brands" id="Brands">
                    <option value="" disabled selected hidden>Brands</option>
                    <option value="Rolex">Rolex</option>
                    <option value="Gucci">Gucci</option>
                </select>
                <select name="Sex" id="Sex">
                    <option value="" disabled selected hidden>Sex</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
                <select name="Color" id="Color">
                    <option value="" disabled selected hidden>Color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Yellow">Yellow</option>
                </select>
                <button className='sell-button' type='submit'>Add</button>
            </form>
        </div>
    );
};

export default Sell;
