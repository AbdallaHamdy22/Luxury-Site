import Image from '../Images/tst.jpg'
const CategorySection = () => (
  <div className="container category-section">
    <h4>SHOP BY CATEGORIES</h4>
    <div className="row">
      <div className="col-md-4 mb-4">
        <img src={Image} alt="Handbags" />
        <h5>HANDBAGS</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image} alt="Shoes" />
        <h5>SHOES</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image} alt="Watches" />
        <h5>WATCHES</h5>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4 mb-4">
        <img src={Image} alt="Accessories" />
        <h5>ACCESSORIES</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image} alt="Fine Jewelry" />
        <h5>FINE JEWELRY</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image} alt="Clothing" />
        <h5>CLOTHING</h5>
      </div>
    </div>
  </div>
);
export default CategorySection;