import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../Redux/RDXFav";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './Fav.css';

const FavComponent = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/backend//getitems.php')
        .then(response => {
            const data = response.data;
            if (Array.isArray(data)) {
                const favoriteProducts = data.filter(product =>
                    favorites.some(fav => fav.id === product.ProductID)
                );
                setProducts(favoriteProducts);
            } else {
                console.error('Expected array but got:', data);
            }
        })
        .catch(error => console.error('Error fetching products:', error));
  }, [favorites]);

  const handleToggleFavorites = (id) => {
    if (isFavorite(id)) {
      dispatch(removeFromFavorites(id));
    }
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);
  if (favorites.length === 0) {
    return (
      <div className="Fav container mt-4 row">
        <h2>Shopping Favouries</h2>
        <p>You don't have favourites yet!</p>
      </div>
    );
  }
  return (
    <div className="Fav container mt-4 row">
      <h2>Shopping Favouries</h2>
        {products.map((product) => (
          <div className="col-sm-6 col-md-4" key={product.ProductID}>
            <div className="card text-white small-card">
              <Link to={'/ItemDetails/' + product.ProductID}>
                <img
                  src={`${product.Image[0]}`}
                  className="card-img-top"
                  alt={product.Name}
                />
              </Link>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">{product.Name}</h5>
                </div>
              </div>
              <button
                onClick={() => handleToggleFavorites(product.ProductID)}
                className="btn"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FavComponent;
