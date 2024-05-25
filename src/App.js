import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login-Register/Login';

const App = () => (
  <>
    <Header />
      <Routes >
        <Route path='/' element={ <Home/>} />
        {/* <Route path='/Items' element={ <Items/>} />
        <Route path='/ItemDetails/:id' element={ <ItemDetails/>} />
        <Route path='/fav' element={<CartComponent />} />
        <Route path="/fav" element={<Favorites />} /> */}
        <Route path='/login' element={<Login />} />
      </Routes>
    <Footer />
  </>
);
export default App;