import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosConfig/instance';
import './Sell.css';
import { useState, useEffect, useRef } from 'react';

const Sell = () => {
    const user = useSelector((state) => state.user.user);
    const [formData, setFormData] = useState({
        ProductName: '',
        description: '',
        price: '',
        quantity: '',
        offerPrice: '',
        CategoireID: '',
        BrandID: '',
        SexID: '',
        ColorID: ''
    });
    
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

        axiosInstance.get('Sex/getSex.php')
            .then(response => setSexes(response.data))
            .catch(error => console.error('Error fetching sexes:', error));

        axiosInstance.get('Color/getcolor.php')
            .then(response => setColors(response.data))
            .catch(error => console.error('Error fetching colors:', error));
    }, []);

    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    const handleChange = (e) => {
        const { name, value} = e.target; 
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        console.log(user.UserID);
        data.append('UserID', user.UserID);
        data.append('Status', formData.offerPrice > '0' ? 'OnSale' : 'Available');
    
        // Append image files
        for (let i = 0; i < imageFiles.length; i++) {
            data.append('images[]', imageFiles[i]);
        }
        
        axiosInstance.post('WaitingList/addqueue.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
                return response.data;
            })
        .then(result => {
            const message = result.message || 'Unknown error';
            if (result.status === 'success') {
                alert(message);
                setFormData({
                    ProductName: '',
                    description: '',
                    price: '',
                    quantity: '',
                    offerPrice: '',
                    CategoireID: '',
                    BrandID: '',
                    SexID: '',
                    ColorID: ''
                });
                setImageFiles([]);
                fileInputRef.current.value = '';
            } else {
                alert('Error: ' + message);
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
                <label htmlFor='price'>Product Price</label>
                <input
                    name='price'
                    type='number'
                    value={formData.price}
                    onChange={handleChange}
                    placeholder='Enter your product price'
                    required
                />
                <label htmlFor='quantity'>Quantity</label>
                <input
                    name='quantity'
                    type='number'
                    value={formData.quantity}
                    onChange={handleChange}
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

                <label htmlFor='offerPrice'>Offer Price</label>
                <input
                    name='offerPrice'
                    type='number'
                    value={formData.offerPrice}
                    placeholder='Enter your offer price.. e.g., 20 if you want 20%'
                    onChange={handleChange}
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
