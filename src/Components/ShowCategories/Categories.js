import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Categories.css';
import PopForm from '../popUpform/popForm';

const ShowCategories = () => {
    const [Categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [currentCategorie, setCurrentCategorie] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        axiosInstance.get('Categoire/getcategoire.php')
            .then(response => {
                setCategories(response.data);
                console.log(Categories);
            })
            .catch(error => {
                console.error("There was an error fetching the Categories!", error);
            });
    }, []);

    const handleEdit = (categorie) => {
        setCurrentCategorie(categorie);
        setImagePreview(categorie.Image);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategorie({ ...currentCategorie, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentCategorie({ ...currentCategorie, Image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const formData = new FormData();
        for (const key in currentCategorie) {
            formData.append(key, currentCategorie[key]);
        }

        axiosInstance.post('Categoire/updatecategoire.php', formData)
            .then(response => {
                setCategories(Categories.map(categorie =>
                    categorie.CategoireID === currentCategorie.CategoireID ? currentCategorie : categorie
                ));
                setShow(false);
            })
            .catch(error => {
                console.error("There was an error updating the Categories!", error);
            });
    };

    return (
        <div className="Categories-table">
            <h1>Categories List</h1>
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
                    {Categories.map(categorie => (
                        <tr key={categorie.CategoireID}>
                            <td>{categorie.CategoireID}</td>
                            <td>{categorie.Name}</td>
                            <td><img src={categorie.Image} alt={categorie.Name} className="category-image" /></td>
                            <td><button onClick={() => handleEdit(categorie)}>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PopForm show={show} handleClose={handleClose} handleSave={handleSave}>
                <h2>Edit Categorie</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="CategoireID" value={currentCategorie.CategoireID} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentCategorie.Name} onChange={handleChange} />
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

export default ShowCategories;
