import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login-Register/Login';
<<<<<<< Updated upstream

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
=======
import NotFound from './Components/NotFound/NotFound';
import CartComponent from './Components/Cart/Cart';
import Items from './Components/Shopping/Items';
import ItemDetails from './Components/ShoppingDetails/Items_details';
import Sell from './Components/Sell/Sell';

import ShowProducts from './Components/ShowProducts/product';
import ShowCategories from './Components/ShowCategories/Categories';
import ShowBrands from './Components/ShowBrand/Brands';
import ShowGenders from './Components/ShowGender/Genders';
import FavComponent from './Components/favorites/Favourites'
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
        <Route path='/ShowBrands' element={<ShowBrands />} />
        <Route path='/ShowGenders' element={<ShowGenders />} />
        <Route path='/ItemDetails/:id' element={<ItemDetails />} />
        <Route path='*' element={<NotFound />} />
>>>>>>> Stashed changes
      </Routes>
    <Footer />
  </>
);
export default App;