import React, { useEffect, useState } from 'react';
import axiosInstance from './../../axiosConfig/instance';
import './product.css';
import PopForm from './popForm';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

    useEffect(() => {
        axiosInstance.get('http://localhost/dashboard/LUXURY-SITE/Products/getproduct.php')
            .then(response => {
                setProducts(response.data);
                console.log(products);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    const handleEdit = (product) => {
        setCurrentProduct(product);
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
        axiosInstance.post('http://localhost/dashboard/LUXURY-SITE/Products/updateproduct.php', currentProduct)
            .then(response => {
                setProducts(products.map(product =>
                    product.ProductID === currentProduct.ProductID ? currentProduct : product
                ));
                setShow(false);
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
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
                        <input type="number" name="ProductID" value={currentProduct.ProductID} onChange={handleChange} />
                    </label>
                    <label>
                        Name
                        <input type="text" name="Name" value={currentProduct.Name} onChange={handleChange} />
                    </label>
                    <label>
                        Price
                        <input type="number" name="Price" value={currentProduct.Price} onChange={handleChange} />
                    </label>
                </form>
            </PopForm>
        </div>
    );
};

export default ShowProducts;
