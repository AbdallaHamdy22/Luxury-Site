import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instance';
import './BuyNow.css';
import MessageCard from '../AlertMessage/Message';

const BuyForm = () => {
    const location = useLocation();
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart.items);
    const [showMessage, setShowMessage] = useState(false);
    const [selfMessage, setSelfMessage] = useState('');
    const [selfType, setSelfType] = useState('');
    const initialFormData = {
        ProductID: '',
        Quantity: '',
        Price: '',
        UserID: user.UserID || '',
        Address: '',
        Street: '',
        Apartment: '',
        City: '',
        State: '',
        Zip: '',
        Country: '',
        Phone: '',
        Notes: '',
    };
    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    useEffect(() => {
        if (location.state && location.state.items) {
            // If navigating from product details or cart
            const { items } = location.state;
            const firstItem = items[0];  // Handle single item for now
            setFormData({
                ...initialFormData,
                ProductID: firstItem.ProductID,
                Quantity: firstItem.Quantity,
                Price: firstItem.Price,
            });
        } else if (cart.length > 0) {
            // If no specific item, populate from the cart
            const firstItem = cart[0];
            setFormData({
                ...initialFormData,
                ProductID: firstItem.ProductID,
                Quantity: firstItem.Quantity,
                Price: firstItem.Price,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [location.state, cart]);

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
    
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
    
        axiosInstance.post('Orders/addOrder.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            const result = response.data;
        
            if (result.status === 'success') {
                setSelfMessage('Order placed successfully!');
                setSelfType("success");
                setShowMessage(true);
            } else {
                setSelfMessage('Failed to place order!');
                setSelfType("error");
                setShowMessage(true);
            }
        })
        .catch(error => {
            console.error('Error during order submission:', error);
        });        
    };
    
    return (
        <div className="Buy-Form">
            {showMessage && (
                <MessageCard
                    type={selfType}
                    message={selfMessage}
                    onClose={handleCloseMessage}
                />
            )}
            <h1 className="form-heading">Place Your Order</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productID">Product ID:</label>
                    <input type="text" id="productID" name="ProductID" value={formData.ProductID} onChange={handleChange} required readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="Quantity" value={formData.Quantity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="text" id="price" name="Price" value={formData.Price} onChange={handleChange} required readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="userID">User ID:</label>
                    <input type="text" id="userID" name="UserID" value={formData.UserID} onChange={handleChange} required readOnly />
                </div>

                <fieldset className="form-group shipping-details">
                    <legend>Shipping Details</legend>

                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="Address" value={formData.Address} onChange={handleChange} required />

                    <label htmlFor="street">Street:</label>
                    <input type="text" id="street" name="Street" value={formData.Street} onChange={handleChange} required />

                    <label htmlFor="apartment">Apartment Number:</label>
                    <input type="text" id="apartment" name="Apartment" value={formData.Apartment} onChange={handleChange} />

                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="City" value={formData.City} onChange={handleChange} required />

                    <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="State" value={formData.State} onChange={handleChange} required />

                    <label htmlFor="zip">Zip Code:</label>
                    <input type="text" id="zip" name="Zip" value={formData.Zip} onChange={handleChange} required />

                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="Country" value={formData.Country} onChange={handleChange} required />

                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" id="phone" name="Phone" value={formData.Phone} onChange={handleChange} required />

                    <label htmlFor="notes">Notes:</label>
                    <textarea id="notes" name="Notes" rows="4" cols="50" value={formData.Notes} onChange={handleChange}></textarea>
                </fieldset>

                <button className="btn-dark" type="submit">Place Order</button>
            </form>
        </div>
    );
}

export default BuyForm;
