import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';

const App = () => (
  <>
    <Header />
    <Home />
    <Footer />
  </>
);
export default App;