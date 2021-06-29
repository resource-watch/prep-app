import React from 'react';
import PropTypes from 'prop-types';

// Libraries
import Scroll from 'react-scroll';

// Components
import { Link } from 'react-router';

// Constants
import { DASHBOARD_NAV } from '../../general-constants/dashboard';

const scroll = Scroll.animateScroll;

export default class NavBar extends React.Component {
  onScroll(id) {
    const targetHeight = document.getElementById(id).getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    // Get element top position
    const offset = targetHeight.top - bodyRect.top;

    scroll.scrollTo(offset);
  }

  render() {
    const { list, anchor, baseUrl, activeTab } = this.props;

    return (
      <div className="row c-nav-tab">
        <div className="columns small-8 small-offset-2">
          <ul>
            {list.map(l => (
              <li id={`tg-${l.value}`} key={l.value} className={activeTab === l.value ? '-active' : ''}>
                {anchor ?
                  <button className="link" onClick={() => this.onScroll(l.value)}>{l.label}</button> :
                  <Link className="link" to={`${baseUrl}/${l.value}`}>{l.label}</Link>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  /**
   * Define the active tab
   * Values: "data", "insights" or "tools"
   */
  activeTab: PropTypes.string.isRequired,
  /**
   * Define the base URL to which the tab's name will be added to
   */
  baseUrl: PropTypes.string.isRequired,
  list: PropTypes.array,
  anchor: PropTypes.bool
};

NavBar.defaultProps = {
  list: DASHBOARD_NAV,
  anchor: false
};
