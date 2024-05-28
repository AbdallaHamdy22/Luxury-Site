import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../Redux/Rxd";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './Fav.css';

const CartComponent = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/backend/')
        .then(response => {
            const data = response.data;
            if (Array.isArray(data)) {
                const favoriteProducts = data.filter(product =>
                    favorites.some(fav => fav.id === product.productsId)
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

  return (
    <>
      <div className="Fav row">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4" key={product.productsId}>
            <div className="card text-white small-card">
              <Link to={'/ItemDetails/' + product.productsId}>
                <img
                  src={`${product.productImg[0]}`}
                  className="card-img-top"
                  alt={product.productName}
                />
              </Link>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">{product.productName}</h5>
                  <span className="glyphicon glyphicon-heart-empty"></span>
                </div>
              </div>
              <button
                onClick={() => handleToggleFavorites(product.productsId)}
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
    </>
  );
};

export default CartComponent;
