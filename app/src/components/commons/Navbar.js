import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  render() {
    const classNames = ['c-navbar'];
    const toggleClassName = ['navbar-toggle'];

    if (this.state.open) {
      classNames.push('-open');
      toggleClassName.push('-open');
    }
    if (this.props.small) classNames.push('-small');
    if (this.props.dark) classNames.push('-dark');

    return (
      <div className={classNames.join(' ')}>
        <div className="wrapper">
          <div className="content">
            <Link to={"/"} className="logo">
              <img src={gon.assets.logo} alt="Preparedness for Resilience" />
            </Link>
            <button
              className={toggleClassName.join(' ')}
              onClick={() => this.setState({ open: !this.state.open })}
            >
              <span></span>
            </button>
            <nav className="navbar">
              <ul className="links">
                <li className={['link', this.props.currentPage === 'data' ? '-active' : ''].join(' ')}>
                  <Link to="/data">Data</Link>
                </li>
                <li className={['link', /^dashboards/.test(this.props.currentPage) ? '-active' : ''].join(' ')}>
                  <Link to="/dashboards">Dashboards</Link>
                </li>
                <li className={['link', /^insights/.test(this.props.currentPage) ? '-active' : ''].join(' ')}>
                  <Link to="/insights">Insights</Link>
                </li>
                <li className="link separator"></li>
                <li className="link -secondary -disable">
                  <a href="#">Search</a>
                </li>
                <li className="link -secondary -disable">
                  <a href="#">English</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  /**
   * Define the size of the header
   * Accepted values:
   * 	- true:  make the header smaller
   * 	- false: keep the header size
   * Default: false
   */
  small: React.PropTypes.bool,
  /**
   * Define the background type of the header
   * Accepted values:
   * 	- true:  add the dark background color
   * 	- false: keep the header transpararent color
   * Default: false
   */
  dark: React.PropTypes.bool,
  /**
   * The current page location
   * Default: ''
   */
  currentPage: React.PropTypes.string,
};

export default Navbar;
