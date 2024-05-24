import Image from '../Images/tst.jpg'
const NewArrivalsSection = () => (
  <div className="container new-arrivals-section mt-5">
    <h4>NEW ARRIVALS</h4>
    <div className="row">
      {[
        { name: 'Rolex', description: 'Rolex Stainless Steel Starbucks', price: '70,197 AED', link: 'product-page-1.html' },
        { name: 'Chanel', description: 'Chanel Navy Blue Leather Mini Boy', price: '15,361 AED', link: 'product-page-2.html' },
        { name: 'Dior', description: 'Dior Burgundy Python Large Lady', price: '14,418 AED', link: 'product-page-3.html' },
        { name: 'Bvlgari', description: 'Bvlgari Pendant Necklace', price: '12,629 AED', link: 'product-page-4.html' },
      ].map(item => (
        <div className="col-md-3 mb-4" key={item.name}>
          <a href={item.link}>
            <img src={Image} alt={item.name} className="img-fluid" />
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </a>
        </div>
      ))}
    </div>
  </div>
);
export default NewArrivalsSection;