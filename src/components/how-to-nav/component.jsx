import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import { Link } from 'react-router';

import { HOW_TO_SECTIONS } from '../../general-constants/general';

const scroll = Scroll.animateScroll;

export default class NavBar extends React.Component {
  onScroll(id) {
    const targetHeight = document.getElementById(id).getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    // Get element top position
    const offset = targetHeight.top - bodyRect.top - 120; // 120px of space to not cut the images

    scroll.scrollTo(offset);
  }

  render() {
    const { list, anchor, baseUrl, activeTab } = this.props;

    return (
      <div className="row c-nav-tab -how-to">
        <div className="columns small-10 small-offset-1">
          <ul>
            {list.map(l => (
              <li id={`tg-${l.slug}`} key={l.slug} className={activeTab === l.slug ? '-active' : ''}>
                {anchor
                  ? <button className="link" onClick={() => this.onScroll(l.slug)}>{l.name}</button>
                  : <Link className="link" to={`${baseUrl}/${l.slug}`}>{l.name}</Link>
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
  list: HOW_TO_SECTIONS,
  anchor: false
};
