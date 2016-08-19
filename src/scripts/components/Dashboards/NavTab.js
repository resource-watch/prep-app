import React from 'react';
import { Link } from 'react-router';

function NavBar(props) {
  return (
    <div className="row c-nav-tab">
      <div className="columns small-8 small-offset-2">
        <ul>
          <li className={props.activeTab === 'indicators' ? '-active' : ''}>
            <Link to={`${props.baseUrl}/indicators`}>Data</Link>
          </li>
          <li className={props.activeTab === 'insights' ? '-active' : ''}>
            <Link to={`${props.baseUrl}/insights`}>Insights</Link>
          </li>
          <li className={props.activeTab === 'tools' ? '-active' : ''}>
            <Link to={`${props.baseUrl}/tools`}>Tools</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  /**
   * Define the active tab
   * Values: "indicators", "insights" or "tools"
   */
  activeTab: React.PropTypes.string.isRequired,
  /**
   * Define the base URL to which the tab's name will be added to
   */
  baseUrl: React.PropTypes.string.isRequired
};

export default NavBar;
