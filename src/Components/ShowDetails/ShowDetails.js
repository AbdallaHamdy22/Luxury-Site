import React, { useEffect, useState } from "react";
import './ShowDetails.css';
import axiosInstance from "../../axiosConfig/instance";

const ShowDetails = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get('Orders/getorder.php')
            .then(response => {
                setOrders(response.data);
                console.log(orders);
            })
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
            });
    }, []);
    return (
        <div className="showDetails"></div>
    );
}

export default ShowDetails;