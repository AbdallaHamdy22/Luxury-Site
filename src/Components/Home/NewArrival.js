import { NavLink } from "react-router-dom";
import './NewArrival.css'

const NewArrivalsSection = () => (
  <div className="container new-arrivals-section mt-5">
    <h4>NEW ARRIVALS</h4>
    <hr></hr>
    <div className="row">
      {[
        { name: 'Rolex', description: 'Rolex Stainless Steel Starbucks', price: '70,197 AED', link: '/ItemDetails/:1', img: "/Images/1.png" },
        { name: 'Chanel', description: 'Chanel Navy Blue Leather Mini Boy', price: '15,361 AED', link: '/ItemDetails/:2', img: "/Images/2.png" },
        { name: 'Dior', description: 'Dior Burgundy Python Large Lady', price: '14,418 AED', link: '/ItemDetails/:3', img: "/Images/3.png" },
        { name: 'Bvlgari', description: 'Bvlgari Pendant Necklace', price: '12,629 AED', link: '/ItemDetails/:4', img: "/Images/4.png" },
      ].map(item => (
        <div className="col-md-3 mb-4" key={item.name}>
          <NavLink to={item.link} style={{ textDecoration: 'none' }}>
            <img src={item.img} alt={item.name} className="img-fluid equal-image" />
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </NavLink>
        </div>
      ))}
    </div>
  </div>
);

export default NewArrivalsSection;
