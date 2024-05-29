import './DropDown.css'
const DropdownMenu = ({ id, title, sections}) => (
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href={sections[0].link} id={id} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {title}
    </a>
    <div className="dropdown-menu dropdown-menu-large" aria-labelledby={id}>
      <div className="dropdown-menu-columns">
        {sections.map(section => (
          <div key={section.header}>
            <h6 className="dropdown-header">{section.header}</h6>
            {section.items.map(item => (
              <a key={item} className="dropdown-item" href="">{item}</a>
            ))}
          </div>
        ))}
      </div>
    </div>
  </li>
);
export default DropdownMenu;