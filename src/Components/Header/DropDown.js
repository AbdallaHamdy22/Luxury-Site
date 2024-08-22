import { NavLink } from "react-router-dom";

const DropdownMenu = ({ id, title, sections, selectedItem, setSelectedItem }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle ${selectedItem === id ? 'selected' : ''}`}
        href={sections[0].link}
        id={id}
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {title}
      </a>
      <div className="dropdown-menu" aria-labelledby={id}>
        {sections.map((section, index) => (
          <div key={index}>
            {section.header && <h6 className="dropdown-header">{section.header}</h6>}
            {section.items.map((item, idx) => (
              <NavLink
                className={`dropdown-item ${selectedItem === `${id}-${item.id}` ? 'selected' : ''}`}
                to={`/items?${id === 'allDropdown' ? `sex=${item.id}` : `category=${id}&sex=${item.id}`}`}
                key={idx}
                onClick={() => setSelectedItem(`${id}-${item.id}`)}
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
