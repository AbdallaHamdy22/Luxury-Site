import React, { useEffect, useState } from "react";
import './ShowOrders.css';
import axiosInstance from "../../axiosConfig/instance";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";

const ShowDetails = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get('WaitingList/getQueueList.php')
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
                <h1>All pending products</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Show Order details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? orders.map(order => (
                            <tr key={order.QueueID}>
                                <td>{order.QueueID}</td>
                                <td>{order.UserName}</td>
                                <td><Link to={`/ShowOrderDetails/${order.QueueID}`}><button>Show Order Details</button></Link></td>
                            </tr>
                        )) : <tr><td colSpan="3">No pending orders</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowDetails;
