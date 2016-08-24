import React from 'react';
import { Link } from 'react-router';

function SecondaryNav() {
  return (
    <nav className="c-nav -secondary">
      <ul>
        <li>
          <Link to="/partners">Partners</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/faqs">FAQS</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SecondaryNav;
