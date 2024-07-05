import React from 'react';
import { NavLink } from 'react-router-dom';


const DropdownMenu = ({ id, title, sections }) => (
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
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
              className="dropdown-item"
              to={title === "ALL" ? `/items?category=${item.id}` : `/items?category=${item.id}&sex=${id}`}
              key={idx}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="dropdown-divider"></div>
        </div>
      ))}
    </div>
  </li>
);

export default DropdownMenu;