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
          <Link to="/resources">Resources</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/faqs">FAQS</Link>
        </li>
        <li>
          <Link to="/terms-of-service">Terms of Service</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SecondaryNav;
