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

    const handleApprove = (queueID) => {
        const formData = new FormData();
        formData.append('QueueID', queueID);
        
        axiosInstance.post('WaitingList/approveQueue.php', formData)
            .then(response => {
                if (response.data.status === 'success') {
                    setOrders(orders.filter(order => order.QueueID !== queueID));
                    alert('Order approved and moved to products successfully.');
                } else {
                    alert('Failed to approve the order: ' + response.data.error);
                }
            })
            .catch(error => {
                console.error("There was an error approving the order!", error);
                alert('An error occurred while approving the order.');
            });
    };

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
                        <th>Approve</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 ? orders.map(order => (
                        <tr key={order.QueueID}>
                            <td>{order.QueueID}</td>
                            <td>{order.UserName}</td>
                            <td><Link to={`/ShowOrderDetails/${order.QueueID}`}><button>Show Order Details</button></Link></td>
                            <td><button onClick={() => handleApprove(order.QueueID)}>Approve</button></td>
                        </tr>
                    )) : <tr><td colSpan="4">No pending orders</td></tr>}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default ShowDetails;
