import React from 'react';
import { Link } from 'react-router';

function MainNav() {
  return (
    <nav className="c-nav -main">
      <ul>
        <li>
          <Link activeClassName="-current" to="/about">About</Link>
        </li>
        <li>
          <Link activeClassName="-current" to="/explore">Explore</Link>
        </li>
        <li>
          <Link activeClassName="-current" to="/dashboards">Dashboards</Link>
        </li>
        <li>
          <Link activeClassName="-current" to="/insights">Insights</Link>
        </li>
        <li>
          <Link activeClassName="-current" to="/create">Create</Link>
        </li>
        <li>
          <Link activeClassName="-current" to="/resources">Resources</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
