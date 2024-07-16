// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, updateQuantity } from '../Redux/RDXCart';
// import CartItem from './CartItem';
// import { Row, Col, Button } from 'react-bootstrap';
// import './Cart.css';

// const Cart = () => {
//     const cart = useSelector((state) => state.cart.items);
//     const dispatch = useDispatch();
//     const [quantities, setQuantities] = useState({});

//     useEffect(() => {
//         setQuantities(cart.reduce((acc, item) => {
//             acc[item.ProductID] = item.Quantity;
//             return acc;
//         }, {}));
//     }, [cart]);

//     const handleQuantityChange = (item, newQuantity) => {
//         if (newQuantity > item.Stock) {
//             alert(`غير مسموح، الكمية المتاحة هي ${item.Stock}`);
//             return;
//         }

//         setQuantities((prevQuantities) => ({
//             ...prevQuantities,
//             [item.ProductID]: newQuantity,
//         }));
//         dispatch(updateQuantity({ id: item.ProductID, amount: newQuantity }));
//     };

//     const handleRemove = (item) => {
//         dispatch(removeFromCart({ id: item.ProductID }));
//     };

//     const subtotal = cart.reduce((acc, item) => acc + item.Price * (quantities[item.ProductID] || 1), 0);

//     return (
//         <div className="shopping-cart container mt-4">
//             <h2>Shopping Cart</h2>
//             {cart.length === 0 ? (
//                 <p>Your cart is empty</p>
//             ) : (
//                 <div>
//                     <Row className="cart-header">
//                         <Col className='col1'><h4>Product</h4></Col>
//                         <Col className='col2'><h4>Price</h4></Col>
//                         <Col className='col3'><h4>Quantity</h4></Col>
//                         <Col className='col4'><h4>Total</h4></Col>
//                     </Row>
//                     {cart.map((item) => (
//                         <CartItem
//                             key={item.ProductID}
//                             item={item}
//                             quantity={quantities[item.ProductID]}
//                             onQuantityChange={handleQuantityChange}
//                             onRemove={handleRemove}
//                         />
//                     ))}
//                     <Row className="cart-total">
//                         <Col className='col1'><h3>Subtotal</h3></Col>
//                         <Col className='col2'></Col>
//                         <Col className='col3'></Col>
//                         <Col className='col4'><h3>{subtotal} AED</h3></Col>
//                     </Row>
//                     <Button variant="primary" className="mt-3">Proceed to Checkout</Button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/RDXCart';
import CartItem from './CartItem';
import { Row, Col, Button } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        setQuantities(cart.reduce((acc, item) => {
            acc[item.ProductID] = item.Quantity;
            return acc;
        }, {}));
    }, [cart]);

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > item.Quantity) {
            alert(`غير مسموح، الكمية المتاحة هي ${item.Quantity}`);
            console.log(item.Quantity);
            console.log(newQuantity);
            return;
        }

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item.ProductID]: newQuantity,
        }));
        dispatch(updateQuantity({ id: item.ProductID, amount: newQuantity }));
    };

    const handleRemove = (item) => {
        dispatch(removeFromCart({ id: item.ProductID }));
    };

    const subtotal = cart.reduce((acc, item) => acc + item.Price * (quantities[item.ProductID] || 1), 0);

    return (
        <div className="shopping-cart container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <Row className="cart-header">
                        <Col className='col1'><h4>Product</h4></Col>
                        <Col className='col2'><h4>Price</h4></Col>
                        <Col className='col3'><h4>Quantity</h4></Col>
                        <Col className='col4'><h4>Total</h4></Col>
                    </Row>
                    {cart.map((item) => (
                        <CartItem
                            key={item.ProductID}
                            item={item}
                            quantity={quantities[item.ProductID]}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))}
                    <Row className="cart-total">
                        <Col className='col1'><h3>Subtotal</h3></Col>
                        <Col className='col2'></Col>
                        <Col className='col3'></Col>
                        <Col className='col4'><h3>{subtotal.toFixed(2)} AED</h3></Col>
                    </Row>
                    <Button variant="primary" className="mt-3">Proceed to Checkout</Button>
                </div>
            )}
        </div>
    );
};

export default Cart;
