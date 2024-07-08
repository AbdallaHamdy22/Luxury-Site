import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login-Register/Login';
import NotFound from './Components/NotFound/NotFound';
import CartComponent from './Components/Cart/Cart';
import Items from './Components/Shopping/Items';
import ItemDetails from './Components/Shopping/Items_details';
import Sell from './Components/Sell/Sell';
import FavComponent from './Components/Favorites/Favourites';
import ShowProducts from './Components/ShowProducts/product';
import ShowCategories from './Components/ShowCategories/Categories';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/join' element={<Login setUser={setUser} />} />
        <Route path='/fav' element={<FavComponent />} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/Items' element={<Items />} />
        <Route path='/ShowProducts' element={<ShowProducts />} />
        <Route path='/ShowCategories' element={<ShowCategories />} />
        <Route path='/ItemDetails/:id' element={<ItemDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};


export default App;
