import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../Redux/Rxd";
import { Link } from 'react-router-dom';
import './Fav.css';

const imagePath = 'https://image.tmdb.org/t/p/w500';
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
      <div className="row">
        {favorites?.map((todo) => {
          return (
            <div className="col-md-6 col-lg-4 col-xl-4" key={todo.id}>
              <div className="card text-white">
                <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                <Link to={'/movieDetails/' + todo.id}>
                <img
                    src={`${imagePath}${todo.imgSrc}`}
                    className="card-img cardImg"
                    alt={ todo.title }
                  />
                  </Link>
                <div className="card-body">
                  <div className="text-center">
                    <h5 className="card-title">{todo.title}</h5>
                    <span className="glyphicon glyphicon-heart-empty"></span>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <span>{todo.release_date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleFavorites(todo.id)}
                  className="btn btn-primary"
                  style={{backgroundColor:'#008080'}}
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