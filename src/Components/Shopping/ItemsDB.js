import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Items.css';

const Items = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="container mt-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">What's New</li>
                </ol>
            </nav>
            <div className="row">
                <aside className="col-md-3">
                    <h4>Filter by</h4>
                    {/* Add filter functionality here */}
                </aside>
                <main className="col-md-9">
                    <div className="row">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img src={product.image} className="card-img-top" alt={product.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text text-danger">{product.price}</p>
                                        {product.label && (
                                            <span className="badge bg-secondary">{product.label}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                        </ul>
                    </nav>
                </main>
            </div>
        </div>
    );
};

export default Items;
