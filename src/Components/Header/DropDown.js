import React from 'react';

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
            <a className="dropdown-item" href={section.link || '#'} key={idx}>
              {item}
            </a>
          ))}
          <div className="dropdown-divider"></div>
        </div>
      ))}
    </div>
  </li>
);

export default DropdownMenu;
