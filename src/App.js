import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import ShoppingPage from './Components/Shopping/shoppingp';
import ProductDetail from './Components/Shopping/product_details';

const App = () => (
  <>
    <Header />
    <Home />
    <ShoppingPage/>
    <ProductDetail/>
    <Footer />
  </>
);
export default App;