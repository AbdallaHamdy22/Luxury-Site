import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login-Register/LoginPage';
import NotFound from './Components/NotFound/NotFound';
import CartComponent from './Components/Cart/Cart';
import Items from './Components/Shopping/Items';
import ItemDetails from './Components/ShoppingDetails/Items_details';
import Sell from './Components/Sell/Sell';
import FavComponent from './Components/favorites/Favourites';
import ShowProducts from './Components/ShowProducts/product';
import ShowCategories from './Components/ShowCategories/Categories';
import ShowBrands from './Components/ShowBrand/Brands';
import ShowGenders from './Components/ShowGender/Genders';
import ShowColors from './Components/ShowColor/Colors';
import AccountSettings from './Components/AccountDetails/Account';
import UserDetails from './Components/UserProducts/userDetails';
import BuyNow from './Components/CashonDelivery/BuyNow';
import { setUser } from './Components/Redux/RDXUser';
import ShowUsers from './Components/ShowUsers/users';
import ShowSellQueue from './Components/ShowSell/ShowSellQueue';
import ShowSellQueueDetails from './Components/ShowSellQueueDetails/ShowSellQueueDetails';
import ShowOrder from './Components/ShowOrders/ShowOrder';
import ScrollToTopButton from './Components/Upbtn/Upbtn';
import ShowOrderDetails from './Components/ShowOrderDetails/ShowOrderDetails';
import ScrollToTop from './Components/Upbtn/ScrolltoUp';
import LoginSuccess from './Components/Login-Register/LoginSuccess';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        {/* <Route path="/success" element={<LoginSuccess />} />
        <Route path="/join" element={<Login />} /> */}
        <Route path="/accountDetails" element={<AccountSettings />} />
        <Route path="/userDetails/:category" element={<UserDetails />} />
        <Route path="/fav" element={<FavComponent />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route path="/buynow" element={<BuyNow />} />
        <Route path="/Items" element={<Items />} />
        <Route path="/Items/:id" element={<ItemDetails key={window.location.pathname} />} />
        <Route path="/ShowSellQueue" element={<ShowSellQueue />} />
        <Route path="/ShowSellQueueDetails/:id" element={<ShowSellQueueDetails />} />
        <Route path="/ShowBrands" element={<ShowBrands />} />
        <Route path="/ShowCategories" element={<ShowCategories />} />
        <Route path="/ShowColors" element={<ShowColors />} />
        <Route path="/ShowGenders" element={<ShowGenders />} />
        <Route path="/ShowOrders" element={<ShowOrder />} />
        <Route path="/ShowOrderDetails/:id" element={<ShowOrderDetails />} />
        <Route path="/ShowProducts" element={<ShowProducts />} />
        <Route path="/ShowUsers" element={<ShowUsers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default App;
