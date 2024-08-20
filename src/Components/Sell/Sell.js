import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosConfig/instance';
import './Sell.css';
import { useState, useEffect, useRef } from 'react';
import MessageCard from '../AlertMessage/Message';

const Sell = () => {
    const user = useSelector((state) => state.user.user);
    const [formData, setFormData] = useState({
        ProductName: '',
        description: '',
        quantity: '',
        CategoireID: '',
        BrandID: '',
        SexID: '',
        ColorID: ''
    });
    
    const [showMessage, setShowMessage] = useState(false);
    const [selfMessage, setSelfMessage] = useState('');
    const [selfType, setSelfType] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sexes, setSexes] = useState([]);
    const [colors, setColors] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        axiosInstance.get('Categoire/getcategoire.php')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

        axiosInstance.get('Brand/getbrand.php')
            .then(response => setBrands(response.data))
            .catch(error => console.error('Error fetching brands:', error));

        axiosInstance.get('Sex/getsex.php')
            .then(response => setSexes(response.data))
            .catch(error => console.error('Error fetching sexes:', error));

        axiosInstance.get('Color/getcolor.php')
            .then(response => setColors(response.data))
            .catch(error => console.error('Error fetching colors:', error));
    }, []);

    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        let formattedValue = value;
    
        // Only format if the input is a number field and not empty
        if (['quantity'].includes(name) && value !== '') {
            // Remove any existing commas before formatting
            const cleanValue = value.replace(/\./g, '');
            formattedValue = new Intl.NumberFormat('de-DE').format(cleanValue);
        }
    
        setFormData({
            ...formData,
            [name]: formattedValue
        });
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        data.append('UserID', user.UserID);
        data.append('Status', 'Submitted');
    
        for (let i = 0; i < imageFiles.length; i++) {
            data.append('images[]', imageFiles[i]);
        }
        
        axiosInstance.post('WaitingList/addqueue.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => response.data)
        .then(result => {
            const message = result.message || 'Unknown error';
            if (result.status === 'success') {
                setSelfMessage(message);
                setSelfType("success");
                setShowMessage(true);
                setFormData({
                    ProductName: '',
                    description: '',
                    quantity: '',
                    CategoireID: '',
                    BrandID: '',
                    SexID: '',
                    ColorID: ''
                });
                setImageFiles([]);
                fileInputRef.current.value = '';
            } else {
                setSelfMessage('Error: ' + message);
                setSelfType("error");
                setShowMessage(true);
            }
        })
        .catch(error => {
            setSelfMessage('An error occurred while submitting the form');
            setSelfType("error");
            setShowMessage(true);
        });
    };
    

    return (
        <div className='sell-container'>
            {showMessage && (
                <MessageCard
                    type={selfType}
                    message={selfMessage}
                    onClose={handleCloseMessage}
                />
            )}
            <h1 className='sell-header'>Sell Your Product Now!</h1>
            <form className='sell-form' onSubmit={handleSubmit}>
                <label htmlFor='ProductName'>Product Name</label>
                <input
                    type='text'
                    name='ProductName'
                    value={formData.ProductName}
                    onChange={handleChange}
                    placeholder='Enter your product name'
                    required
                />
                <label htmlFor='description'>Product Description</label>
                <textarea
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Enter your product description.. e.g., small black bag with unique bracelet material'
                    required
                />
                <label htmlFor='quantity'>Quantity</label>
                <input
                    name='quantity'
                    type='number'
                    value={formData.quantity}
                    onChange={handleChange}
                    onWheel={(e) => e.target.blur()}
                    placeholder='Enter your product available quantity'
                    required
                />
                <label htmlFor='images'>Images</label>
                <input
                    name='images'
                    type='file'
                    multiple
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    required
                />
                <label htmlFor='CategoireID'>Categories</label>
                <select name="CategoireID" id="CategoireID" value={formData.CategoireID} onChange={handleChange} required>
                    <option value="" disabled>Select Category</option>
                    {categories.map(category => (
                        <option key={category.CategoireID} value={category.CategoireID}>{category.Name}</option>
                    ))}
                </select>
                <label htmlFor='BrandID'>Brands</label>
                <select name="BrandID" id="BrandID" value={formData.BrandID} onChange={handleChange} required>
                    <option value="" disabled>Select Brand</option>
                    {brands.map(brand => (
                        <option key={brand.BrandID} value={brand.BrandID}>{brand.Name}</option>
                    ))}
                </select>
                <label htmlFor='SexID'>Gender</label>
                <select name="SexID" id="SexID" value={formData.SexID} onChange={handleChange} required>
                    <option value="" disabled>Select Gender</option>
                    {sexes.map(sex => (
                        <option key={sex.SexID} value={sex.SexID}>{sex.Name}</option>
                    ))}
                </select>
                <label htmlFor='ColorID'>Color</label>
                <select name="ColorID" id="ColorID" value={formData.ColorID} onChange={handleChange} required>
                    <option value="" disabled>Select Color</option>
                    {colors.map(color => (
                        <option key={color.Color_ID} value={color.Color_ID}>{color.Name}</option>
                    ))}
                </select>
                <button className='sell-button' type='submit'>Add</button>
            </form>
        </div>
    );
};

export default Sell;
