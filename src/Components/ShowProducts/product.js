import React, { useEffect, useState } from 'react';
import axiosInstance from './../../axiosConfig/instance';
import './product.css';
import PopForm from '../popUpform/popForm';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        axiosInstance.get('Products/getproduct.php')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentProduct({ ...currentProduct, Image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setImagePreview(product.Image);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleSave = () => {
        const formData = new FormData();
        for (const key in currentProduct) {
            formData.append(key, currentProduct[key]);
        }

        axiosInstance.post('Products/updateproduct.php', formData)
        .then(response => {
            setProducts(products.map(product =>
                product.ProductID === currentProduct.ProductID ? currentProduct : product
            ));
            setShow(false);
        })
        .catch(error => {
            console.error("There was an error updating the Categories!", error);
        });
    };

    return (
        <div className="product-table">
            <h1>Products List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.ProductID}>
                            <td>{product.ProductID}</td>
                            <td>{product.Name}</td>
                            <td>{product.Price}</td>
                            <td><img src={product.Image} alt={product.Name} className="product-image" /></td>
                            <td><button onClick={() => handleEdit(product)}>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PopForm show={show} handleClose={handleClose} handleSave={handleSave}>
                <h2>Edit Product</h2>
                <form>
                    <label>
                        ID
                        <input type="number" name="Product ID" value={currentProduct.ProductID} onChange={handleChange} />
                    </label>
                    <label>
                        Name
                        <input type="text" name="Name" value={currentProduct.Name} onChange={handleChange} />
                    </label>
                    <label>
                        Price
                        <input type="number" name="Price" value={currentProduct.Price} onChange={handleChange} />
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

export default ShowProducts;
