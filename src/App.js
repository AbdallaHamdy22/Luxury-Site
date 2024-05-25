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
import CartComponent from './Components/favorites/Fav';
import Rdx from './Components/Redux/Rxd';
import Items from './Components/Shopping/Items';
import ItemDetails from './Components/Shopping/Items_details';

const App = () => (
  <>
    <Header />
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/join' element={<Login />} />
      <Route path='/fav' element={<CartComponent />} />
      <Route path='/fav' element={<Rdx />} />
      <Route path='/Items' element={ <Items/>} />
      <Route path='/ItemDetails/:id' element={ <ItemDetails/>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </>
);
export default App;