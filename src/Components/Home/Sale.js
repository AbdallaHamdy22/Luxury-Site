import './Sale.css';
import { NavLink } from 'react-router-dom';

const SaleBanner = () => (
  <div className="container sale-banner mt-5">
    <div className="row">
      <div className="col-12 col-lg-6">
        <div className="p-4">
          <h2>HOTTEST SALE OF THE YEAR</h2>
          <h3>GET UPTO $500 OFF</h3>
          <p>USE CODE: SALE</p>
          <NavLink to="/Items">
            <button className="btn btn-dark">SHOP NOW</button>
          </NavLink>
          <p>*T&C APPLY</p>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <img src={"/Images/1.png"} alt="Sale Image" className="img-fluid" />
      </div>
    </div>
  </div>
);

export default SaleBanner;
