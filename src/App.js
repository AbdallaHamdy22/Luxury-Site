import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login-Register/Login';
import NotFound from './Components/NotFound/NotFound';
import FavComponent from './Components/Favorites/Fav';
import CartComponent from './Components/Cart/Cart';
import RdxFav from './Components/Redux/RDXFav';
import RdxCart from './Components/Redux/RDXCart';
import Items from './Components/Shopping/Items';
import ItemDetails from './Components/Shopping/Items_details';
import Sell from './Components/Sell/Sell'
const App = () => (
  <>
    <Header />
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/sell' element={<Sell />} />
      <Route path='/join' element={<Login />} />
      <Route path='/fav' element={<FavComponent />} />
      <Route path='/fav' element={<RdxFav />} />
      <Route path='/cart' element={<CartComponent />} />
      <Route path='/cart' element={<RdxCart />} />
      <Route path='/Items' element={ <Items/>} />
      <Route path='/ItemDetails/:id' element={ <ItemDetails/>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </>
);
export default App;