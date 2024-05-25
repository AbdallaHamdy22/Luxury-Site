import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login-Register/Login';
import Shopping from './Components/Shopping/Shopping';

const App = () => (
  <>
    <Header />
      <Routes >
        <Route path='/' element={ <Home/>} />
        <Route path='/join' element={<Login />} />
        <Route path='/shopping' element={<Shopping />} />
        {/* <Route path='/Items' element={ <Items/>} />
        <Route path='/ItemDetails/:id' element={ <ItemDetails/>} />
        <Route path='/fav' element={<CartComponent />} />
        <Route path="/fav" element={<Favorites />} /> */}
      </Routes>
    <Footer />
  </>
);
export default App;