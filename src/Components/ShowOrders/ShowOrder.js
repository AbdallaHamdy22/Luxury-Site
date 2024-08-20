import React, { useEffect, useState } from "react";
import './ShowOrder.css';
import axiosInstance from "../../axiosConfig/instance";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageCard from "../AlertMessage/Message";

const ShowOrder = () => {
    const [orders, setOrders] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [selfType, setSelfType] = useState("");
    const [selfMessage, setSelfMessage] = useState("");
    const handleCloseMessage = () => {
        setShowMessage(false);
    };
    useEffect(() => {        
        axiosInstance.get('orders/')        
            .then(response => {
                setOrders(response.data);                
            })            
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
            });
            
    }, []);
    // const handleIgnore = (id) => {
    //     const data = { QueueID: id };
    //     axiosInstance.post('WaitingList/ignoreQueue.php', data)
    //         .then(response => {
    //             if (response.data.status === 'success') {
    //                 setSelfMessage("Order deleted successfully!");
    //                 setSelfType("success");
    //                 setShowMessage(true);
    //             } else {
    //                 setSelfMessage('Failed to ignore the order: ' + response.data.message);
    //                 setSelfType("error");
    //                 setShowMessage(true);
    //             }
    //         })
    //         .catch(error => {
    //             setSelfMessage('An error occurred while ignoring the order.',error);
    //             setSelfType("error");
    //             setShowMessage(true);
    //         });
    // };

    return (
        <div className="orders-container">
            {showMessage&&<MessageCard
                type={selfType}
                message={selfMessage}
                onClose={handleCloseMessage}
            />}
            <Sidebar />
            <div className="showDetails-table">
                <h1>All pending products</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Show Order details</th>
                            {/* <th>Delete order</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? orders.map(order => (
                            <tr key={order.OrderID}>
                                <td>{order.OrderID}</td>
                                <td>{order.UserName}</td>
                                <td><Link to={`/ShowOrderDetails/${order.OrderID}`}><button>Show Order Details</button></Link></td>
                                {/* <td><button onClick={handleIgnore(order.OrderID)}className="delete-button">
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button></td> */}
                            </tr>
                        )) : <tr><td colSpan="4">No pending orders</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowOrder;
