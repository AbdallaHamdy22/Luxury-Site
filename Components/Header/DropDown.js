import { NavLink } from "react-router-dom";

const DropdownMenu = ({ id, title, sections, selectedItem, setSelectedItem }) => {
  return (
    <li 
      className="nav-item dropdown" 
      onMouseEnter={() => setSelectedItem(id)} 
      onMouseLeave={() => setSelectedItem(null)}
    >
      <NavLink
        className={`nav-link dropdown-toggle`}
        to={sections[0].link}
        id={id}
        role="button"
        aria-haspopup="true"
        aria-expanded={selectedItem === id ? 'true' : 'false'}
        style={{ cursor: 'pointer' }}
      >
        {title}
      </NavLink>
      <div className={`dropdown-menu ${selectedItem === id ? 'show' : ''}`} aria-labelledby={id}>
        {sections.map((section, index) => (
          <div key={index}>
            {section.header && <h6 className="dropdown-header">{section.header}</h6>}
            {section.items.map((item, idx) => (
              <NavLink
                className="dropdown-item"
                to={`/items?${id === 'allDropdown' ? `sex=${item.id}` : `category=${id}&sex=${item.id}`}`}
                key={idx}
                onClick={() => setSelectedItem(null)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </li>
  );
};

export default DropdownMenu;
