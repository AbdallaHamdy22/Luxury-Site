import React from 'react';
import DropdownMenu from './DropDown';

const DropdownMenus = () => (
  <div className="bg-white border-top">
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav2">
        <ul className="navbar-nav">
          <DropdownMenu
            id="womenDropdown"
            title="WOMEN"
            sections={[
              { header: 'BAGS', items: ['Shoulder Bags', 'Totes Bags', 'Clutches', 'Hobos Bags', 'Satchel Bags', 'Women Wallets', 'Exotic Bags', 'Everyday Bags', 'Evening Bags', 'Women Backpacks', 'Women Briefcases', 'Women Suitcases', 'Women Belt Bags', 'All Bags >'] },
              { header: 'SHOES', items: ['Women Sandals', 'Women Sneakers', 'Women Pumps', 'Women Flats', 'Women Boots', 'All Shoes >'] },
              { header: 'ACCESSORIES', items: ['Women Sunglasses', 'Women Belts', 'Women Jewelry', 'Women Scarves', 'Women Hair Accessories', 'All Accessories >'] },
              { header: 'WATCHES', items: ['Women Rolex Watches', 'Women Cartier Watches', 'Women Burberry Watches', 'Women Dior Watches', 'Women Gucci Watches', 'Women Michael Kors Watches', 'Women Bvlgari Watches', 'Women Louis Vuitton Watches', 'Women Versace Watches', 'Women Omega Watches', 'Women Chopard Watches', 'Women Hermes Watches', 'Women Chanel Watches', 'Women Just Cavalli Watches', 'Women Hublot Watches', 'Discover More Brands >'] },
              { header: 'FINE JEWELRY', items: ['Bracelets', 'Earrings', 'Necklaces', 'Rings', 'All Fine Jewelry >', 'CLOTHING', 'Dresses', 'Tops', 'Skirts', 'Coats', 'Jackets', 'Pants', 'Jeans & Denim', 'Sweaters & Knitwear', 'Suits', 'Shorts', 'All Clothing >'] }
            ]}
          />
          <DropdownMenu
            id="menDropdown"
            title="MEN"
            sections={[
              { header: 'BAGS', items: ['Shoulder Bags', 'Totes Bags', 'Clutches', 'Hobos Bags', 'Satchel Bags', 'Men Wallets', 'Exotic Bags', 'Everyday Bags', 'Evening Bags', 'Men Backpacks', 'Men Briefcases', 'Men Suitcases', 'Men Belt Bags', 'All Bags >'] },
              { header: 'SHOES', items: ['Men Sandals', 'Men Sneakers', 'Men Pumps', 'Men Flats', 'Men Boots', 'All Shoes >'] },
              { header: 'ACCESSORIES', items: ['Men Sunglasses', 'Men Belts', 'Men Jewelry', 'Men Scarves', 'Men Hair Accessories', 'All Accessories >'] },
              { header: 'WATCHES', items: ['Men Rolex Watches', 'Men Cartier Watches', 'Men Burberry Watches', 'Men Dior Watches', 'Men Gucci Watches', 'Men Michael Kors Watches', 'Men Bvlgari Watches', 'Men Louis Vuitton Watches', 'Men Versace Watches', 'Men Omega Watches', 'Men Chopard Watches', 'Men Hermes Watches', 'Men Chanel Watches', 'Men Just Cavalli Watches', 'Men Hublot Watches', 'Discover More Brands >'] },
              { header: 'FINE JEWELRY', items: ['Bracelets', 'Earrings', 'Necklaces', 'Rings', 'All Fine Jewelry >', 'CLOTHING', 'Dresses', 'Tops', 'Skirts', 'Coats', 'Jackets', 'Pants', 'Jeans & Denim', 'Sweaters & Knitwear', 'Suits', 'Shorts', 'All Clothing >'] }
            ]}
          />
          <DropdownMenu
            id="handbagsDropdown"
            title="HANDBAGS"
            sections={[
              { header: 'BAGS', items: ['Shoulder Bags', 'Totes Bags', 'Clutches', 'Hobos Bags', 'Satchel Bags', 'Handbags', 'Exotic Bags', 'Everyday Bags', 'Evening Bags', 'Backpacks', 'Briefcases', 'Suitcases', 'Belt Bags', 'All Bags >'] }
            ]}
          />
          <DropdownMenu id="hotDealsDropdown" title="HOT DEALS" sections={[{ header: 'DEALS', items: ['All Deals'] }]} />
          <DropdownMenu id="watchesDropdown" title="WATCHES" sections={[
            { header: 'WATCHES', items: ['Rolex Watches', 'Cartier Watches', 'Burberry Watches', 'Dior Watches', 'Gucci Watches', 'Michael Kors Watches', 'Bvlgari Watches', 'Louis Vuitton Watches', 'Versace Watches', 'Omega Watches', 'Chopard Watches', 'Hermes Watches', 'Chanel Watches', 'Just Cavalli Watches', 'Hublot Watches', 'Discover More Brands >'] }
          ]} />
          <DropdownMenu id="newArrivalsDropdown" title="NEW ARRIVALS" sections={[{ header: 'NEW ARRIVALS', items: ['All New Arrivals'] }]} />
          <DropdownMenu id="clearanceDropdown" title="CLEARANCE" sections={[{ header: 'CLEARANCE', items: ['All Clearance'] }]} />
          <DropdownMenu id="designersDropdown" title="DESIGNERS" sections={[{ header: 'DESIGNERS', items: ['All Designers'] }]} />
          <DropdownMenu id="videoShoppingDropdown" title="VIDEO SHOPPING" sections={[{ header: 'VIDEO SHOPPING', items: ['All Video Shopping'] }]} />
          <DropdownMenu id="magazineDropdown" title="MAGAZINE" sections={[{ header: 'MAGAZINE', items: ['All Magazine'] }]} />
          <DropdownMenu id="authenticityDropdown" title="AUTHENTICITY" sections={[{ header: 'AUTHENTICITY', items: ['All Authenticity'] }]} />
        </ul>
      </div>
    </nav>
  </div>
);

export default DropdownMenus;
