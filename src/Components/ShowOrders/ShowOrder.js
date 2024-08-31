import React, { useEffect, useState } from "react";
import './ShowOrder.css';
import axiosInstance from "../../axiosConfig/instance";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";

const ShowOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get('Orders/')     
            .then(response => {
                setOrders(response.data);                
            })            
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
            });
    }, []);

    return (
        <div className="orders-container">
            <Sidebar />
            <div className="showDetails-table">
                <h1>All queued orders</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>Phone Number</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>Apartment Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Street</th>
                            <th>Zip Code</th>
                            <th>Notes</th>
                            <th>Show Order details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? orders.map(order => (
                            <tr key={order.OrderID}>
                                <td>{order.OrderID}</td>
                                <td>{order.UserName}</td>
                                <td>{order.PhoneNumber}</td>
                                <td>{order.OrderDate}</td>
                                <td>{order.Status}</td>
                                <td>{order.Address}</td>
                                <td>{order.ApartmentNumber}</td>
                                <td>{order.City}</td>
                                <td>{order.State}</td>
                                <td>{order.Country}</td>
                                <td>{order.Street}</td>
                                <td>{order.ZipCode}</td>
                                <td>{order.Notes}</td>
                                <td><Link to={`/ShowOrderDetails/${order.OrderID}`}><button>Show Order Details</button></Link></td>
                            </tr>
                        )) : <tr><td colSpan="14">No pending orders</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowOrder;
