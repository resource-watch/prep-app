import React from 'react';

// Components
import { Link } from 'react-router';

// Constants
import { DASHBOARD_NAV } from '../../general-constants/dashboard';

function NavBar(props) {
  return (
    <div className="row c-nav-tab">
      <div className="columns small-8 small-offset-2">
        <ul>
          {props.list.map(l => (
            <li className={props.activeTab === l.value ? '-active' : ''}>
              {props.anchor ?
                <a className="link" href={`#${l.value}`}>{l.label}</a> :
                <Link className="link" to={`${props.baseUrl}/${l.value}`}>{l.label}</Link>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  /**
   * Define the active tab
   * Values: "data", "insights" or "tools"
   */
  activeTab: React.PropTypes.string.isRequired,
  /**
   * Define the base URL to which the tab's name will be added to
   */
  baseUrl: React.PropTypes.string.isRequired,
  list: React.PropTypes.array,
  anchor: React.PropTypes.bool
};

NavBar.defaultProps = {
  list: DASHBOARD_NAV,
  anchor: false
};

export default NavBar;
