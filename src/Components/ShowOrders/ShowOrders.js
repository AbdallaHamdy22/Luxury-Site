import React, { useEffect, useState } from "react";
import './ShowOrders.css';
import axiosInstance from "../../axiosConfig/instance";
import { Link } from "react-router-dom";

const ShowDetails = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get('Products/getproduct.php')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
            });
    }, []);
    
    return (
        <div className="showDetails-table">
            <h1>All pending products</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Show products details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.ProductID}>
                            <td>{order.ProductID}</td>
                            <td>{order.Name}</td>
                            <td><Link to={`/ShowOrderDetails/${order.ProductID}`}><button>show order details</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowDetails;