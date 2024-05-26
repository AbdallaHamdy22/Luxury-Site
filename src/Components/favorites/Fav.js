
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../Redux/Rxd";
import { Link } from 'react-router-dom';
import './Fav.css';

const CartComponent = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const handleToggleFavorites = (id) => {
    if (isFavorite(id)) {
      dispatch(removeFromFavorites(id));
    }
  };

  return (
    <>
      <div className="Fav row">
        {favorites?.map((todo) => {
          return (
            <div className="col-sm-6 col-md-4" key={todo.id}>
              <div className="card text-white small-card">
                <Link to={'/ItemDetails/' + todo.id}>
                  <img
                    src={`${todo.image}`}
                    className="card-img-top"
                    alt={todo.name}
                  />
                </Link>
                <div className="card-body">
                  <div className="text-center">
                    <h5 className="card-title">{todo.name}</h5>
                    <span className="glyphicon glyphicon-heart-empty"></span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleFavorites(todo.id)}
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
          );
        })}
      </div>
    </>
  );
};

export default CartComponent;
