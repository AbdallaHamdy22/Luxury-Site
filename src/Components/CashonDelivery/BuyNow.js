import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instance';
import MessageCard from '../AlertMessage/Message';
import { clearCart } from '../Redux/RDXCart';
import './BuyNow.css';

const BuyForm = () => {
    const location = useLocation();
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [showMessage, setShowMessage] = useState(false);
    const [selfMessage, setSelfMessage] = useState('');
    const [selfType, setSelfType] = useState('');
    const navigate = useNavigate();
    const initialFormData = {
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
        Products: [],
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        let products = [];
        let notes = "";
        if (location.state && location.state.items) {
            products = location.state.items;
            notes = location.state.items[0]?.Notes || "";
        } else if (cart.length > 0) {
            products = cart.map(item => ({
                ProductID: item.ProductID,
                Quantity: item.Quantity,
                Price: item.Price,
            }));
        }
        setFormData({
            ...initialFormData,
            Products: products,
            Notes: notes,
        });
    }, [location.state, cart]);

    const handleProductChange = (index, e) => {
        const updatedProducts = formData.Products.map((product, i) => (
            i === index ? { ...product, [e.target.name]: e.target.value } : product
        ));
        setFormData({
            ...formData,
            Products: updatedProducts
        });
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance.post('Orders/addOrder.php', formData)
            .then(response => {
                const result = response.data;

                if (result.status === 'success') {
                    setSelfMessage('Order placed successfully!');
                    setSelfType("success");
                    setShowMessage(true);
                    
                    dispatch(clearCart());
                    
                    setTimeout(() => {
                        navigate("/Items");
                    }, 2000);
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
                {formData.Products.map((product, index) => {
                    const formattedPrice = new Intl.NumberFormat().format(product.Price);
                    return (
                        <fieldset key={index} className="form-group product-details">
                            <legend>Product {index + 1}</legend>
                            <label htmlFor={`productID-${index}`}>Product ID:</label>
                            <input type="text" id={`productID-${index}`} name="ProductID" value={product.ProductID} readOnly/>

                            <label htmlFor={`quantity-${index}`}>Quantity:</label>
                            <input type="number" id={`quantity-${index}`} name="Quantity" value={product.Quantity} readOnly onChange={(e) => handleProductChange(index, e)} required />

                            <label htmlFor={`price-${index}`}>Price:</label>
                            <input type="text" id={`price-${index}`} name="Price" value={formattedPrice} readOnly/>
                        </fieldset>
                    );
                })}

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
