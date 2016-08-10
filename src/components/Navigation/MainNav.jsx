import React from 'react';
import { Link } from 'react-router';

function MainNav() {
  return (
    <nav className="c-nav -main">
      <ul>
        <li>
          <Link to="/partnership">Partnership</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/dashboards">Dashboards</Link>
        </li>
        <li>
          <Link to="/insights">Insights</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
