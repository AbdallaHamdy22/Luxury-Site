import './Category.css'

const CategorySection = () => (
  <div className="container category-section">
    <h4>SHOP BY CATEGORIES</h4>
    <br></br>
    <div className="row">
      <div className="col-md-4 mb-4">
        <img src="/Images/2.png" alt="Handbags" />
        <h5>HANDBAGS</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src="/Images/3.png" alt="Shoes" />
        <h5>SHOES</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src="/Images/4.png" alt="Watches" />
        <h5>WATCHES</h5>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4 mb-4">
        <img src="/Images/5.png" alt="Accessories" />
        <h5>ACCESSORIES</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src="/Images/6.png" alt="Fine Jewelry" />
        <h5>FINE JEWELRY</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src="/Images/7.png" alt="Clothing" />
        <h5>CLOTHING</h5>
      </div>
    </div>
  </div>
);
export default CategorySection;