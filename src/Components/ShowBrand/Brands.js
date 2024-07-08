import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Brands.css';
import PopForm from '../popUpform/popForm';

const ShowBrands = () => {
    const [Brands, setBrands] = useState([]);
    const [show, setShow] = useState(false);
    const [currentBrand, setCurrentBrand] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        axiosInstance.get('Brand/getbrand.php')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the Brands!", error);
            });
    }, []);

    const handleEdit = (Brand) => {
        setCurrentBrand(Brand);
        setImagePreview(Brand.Image);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentBrand({ ...currentBrand, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentBrand({ ...currentBrand, Image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const formData = new FormData();
        for (const key in currentBrand) {
            formData.append(key, currentBrand[key]);
        }

        axiosInstance.post('Brand/updatebrand.php', formData)
            .then(response => {
                setBrands(Brands.map(Brand =>
                    Brand.BrandID === currentBrand.BrandID ? currentBrand : Brand
                ));
                setShow(false);
            })
            .catch(error => {
                console.error("There was an error updating the Brands!", error);
            });
    };

    return (
        <div className="Brands-table">
            <h1>Brands List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Brands.map(Brand => (
                        <tr key={Brand.BrandID}>
                            <td>{Brand.BrandID}</td>
                            <td>{Brand.Name}</td>
                            <td><img src={Brand.Image} alt={Brand.Name} className="category-image" /></td>
                            <td><button onClick={() => handleEdit(Brand)}>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PopForm show={show} handleClose={handleClose} handleSave={handleSave}>
                <h2>Edit Brand</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="BrandID" value={currentBrand.BrandID} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentBrand.Name} onChange={handleChange} />
                    </label>
                    <label>
                        Image:
                        <input type="file" name="Image" onChange={handleImageChange} />
                    </label>
                    {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                </form>
            </PopForm>
        </div>
    );
};

export default ShowBrands;