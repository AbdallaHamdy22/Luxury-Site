import Image from '../Images/logo.jpg'

const BrandSection = () => (
  <div className="container brand-section">
    <h4>SHOP BY BRANDS</h4>
    <div className="row">
      {['Louis Vuitton', 'Hermès', 'Chanel', 'Cartier', 'Dior', 'Rolex', 'Gucci', 'All Brands'].map(brand => (
        <div className="col-md-1 mb-4" key={brand}>
          <img src={Image} alt={brand} />
          <h5>{brand.toUpperCase()}</h5>
        </div>
      ))}
    </div>
  </div>
);
export default BrandSection;