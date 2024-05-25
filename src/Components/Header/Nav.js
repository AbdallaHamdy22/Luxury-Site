const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <a className="navbar-brand" href="../Shopping/Shopping.js">The Luxury Closet</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <form className="form-inline my-2 my-lg-0 mx-auto">
        <input className="form-control mr-sm-2 search-bar" type="search" placeholder="What are you looking for?" aria-label="Search" />
      </form>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="../Login-Register/Login.js">Sign in</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Wishlist</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Bag</a>
        </li>
        <li className="nav-item">
          <button className="btn sell-now-btn">SELL NOW!</button>
        </li>
      </ul>
    </div>
  </nav>
);
export default Navbar;