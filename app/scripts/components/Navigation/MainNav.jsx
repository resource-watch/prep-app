import React from 'react';
import { Link } from 'react-router';

// components
import User from '../user/user';

class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutActive: false
    };
  }

  handleHover(newState) {
    this.setState(newState);
  }

  render() {
    const { aboutActive } = this.state;

    return (
      <nav className="c-nav -main">
        <ul>
          <li
            onMouseEnter={() => this.handleHover({ aboutActive: true })}
            onMouseLeave={() => this.handleHover({ aboutActive: false })}
          >
            <Link activeClassName="-current" to="/about">About</Link>
            { aboutActive && <div className="submenu">
              <ul className="submenu-list">
                <li><Link activeClassName="-current" to="/partners">Partners</Link></li>
                <li><Link activeClassName="-current" to="/faqs">FAQs</Link></li>
                <li><Link activeClassName="-current" to="/how-to">How to</Link></li>
                <li><Link activeClassName="-current" to="/contact">Contact us</Link></li>
              </ul>
            </div>}
          </li>
          <li>
            <Link activeClassName="-current" to="/explore">Explore</Link>
          </li>
          <li>
            <Link activeClassName="-current" to="/dashboards">Dashboards</Link>
          </li>
          <li>
            <Link activeClassName="-current" to="/stories">Stories</Link>
          </li>
          <li>
            <Link activeClassName="-current" to="/resources">Resources</Link>
          </li>
          <li className="avatar-container">
            <User />
          </li>
        </ul>
      </nav>
    );
  }
}

export default MainNav;
