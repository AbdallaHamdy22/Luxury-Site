import Image from '../Images/logo.jpg'
const Footer = () => (
  <footer className="footer mt-5">
    <div className="container">
      <div className="row">
        {[
          { title: 'Top Categories', items: ['Handbags', 'Women\'s Watches', 'Women\'s Shoes', 'Women\'s Clothes', 'Fine Jewelry', 'Women\'s Accessories', 'Men\'s Watches', 'Men\'s Bags', 'Men\'s Shoes', 'Men\'s Clothes', 'Men\'s Sneakers'] },
          { title: 'Top Brands', items: ['Chanel', 'Rolex', 'Louis Vuitton', 'Hermès', 'Gucci', 'Dior', 'Hermes', 'Prada', 'Coach', 'Saint Laurent'] },
          { title: 'About The Luxury Closet', items: ['About Us', 'How Does It Work?', 'Privacy Policy', 'Terms & Conditions', 'FAQs', 'Sell Now', 'Delivery & Returns', 'Warranty'] },
          { title: 'Customer Service', items: ['Contact Us', 'FAQs', 'Student & Youth Discount', 'Essential Worker Discount'], help: true }
        ].map(section => (
          <div className="col-md-3" key={section.title}>
            <h5>{section.title}</h5>
            <ul className="list-unstyled">
              {section.items.map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
            {section.help && (
              <>
                <h5>We Are Here To Help You!</h5>
                <ul className="list-unstyled">
                  <li>800 LUX (800 589)</li>
                  <li>Monday to Sunday</li>
                  <li>9 am to 9 pm (GST)</li>
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-3">
        {['facebook-f', 'instagram', 'twitter', 'youtube', 'whatsapp'].map(icon => (
          <a href="#" key={icon}><i className={`fab fa-${icon}`}></i></a>
        ))}
      </div>
      <div className="text-center mt-3">
        <a href="#"><img src={Image} alt="Google Play" style={{ width: '150px' }} /></a>
        <a href="#"><img src={Image} alt="App Store" style={{ width: '150px' }} /></a>
      </div>
      <div className="text-center mt-3">
        <p>Novotel Dubai Al Barsha API Trio Tower Office 901 PO Box:502626</p>
      </div>
    </div>
  </footer>
);

export default Footer;