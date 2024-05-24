import Image from '../Images/tst.jpg'

const SaleBanner = () => (
  <div className="container sale-banner mt-5">
    <div className="row">
      <div className="col-lg-6">
        <div className="p-4">
          <h2>HOTTEST SALE OF THE YEAR</h2>
          <h3>GET UPTO $500 OFF</h3>
          <p>USE CODE: SALE</p>
          <button className="btn btn-dark">SHOP NOW</button>
          <p>*T&C APPLY</p>
        </div>
      </div>
      <div className="col-lg-6">
        <img src={Image} alt="Sale Image" className="img-fluid" />
      </div>
    </div>
  </div>
);

export default SaleBanner;