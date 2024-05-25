import Image1 from '../Images/2.png'
import Image2 from '../Images/3.png'
import Image3 from '../Images/4.png'
import Image4 from '../Images/5.png'
import Image5 from '../Images/6.png'
import Image6 from '../Images/7.png'
import './Category.css'
const CategorySection = () => (
  <div className="container category-section">
    <h4>SHOP BY CATEGORIES</h4>
    <br></br>
    <div className="row">
      <div className="col-md-4 mb-4">
        <img src={Image1} alt="Handbags" />
        <h5>HANDBAGS</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image2} alt="Shoes" />
        <h5>SHOES</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image3} alt="Watches" />
        <h5>WATCHES</h5>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4 mb-4">
        <img src={Image4} alt="Accessories" />
        <h5>ACCESSORIES</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image5} alt="Fine Jewelry" />
        <h5>FINE JEWELRY</h5>
      </div>
      <div className="col-md-4 mb-4">
        <img src={Image6} alt="Clothing" />
        <h5>CLOTHING</h5>
      </div>
    </div>
  </div>
);
export default CategorySection;