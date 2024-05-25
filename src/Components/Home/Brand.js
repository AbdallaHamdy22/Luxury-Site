import Image from '../Images/logo.jpg'
import './Brand.css'
const BrandSection = () => (
  <div className="container brand-section">
    <h4>SHOP BY BRANDS</h4>
    <br></br>
    <div className="row d-flex justify-content-center">
      {['Louis Vuitton', 'Hermès', 'Chanel', 'Cartier', 'Dior', 'Rolex', 'Gucci', 'All Brands'].map(brand => (
        <div className="col-md-1 mb-4 text-center" key={brand}>
          <img src={Image} alt={brand} />
          <h5>{brand.toUpperCase()}</h5>
        </div>
      ))}
    </div>
  </div>
);
export default BrandSection;
