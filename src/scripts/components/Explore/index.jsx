import React from 'react';
import { Link } from 'react-router';
import MainNav from '../../components/Navigation/MainNav';

import metadata from 'json!../../metadata.json';
import logoImage from '../../../images/prep-logo.png';

class Explore extends React.Component {

  getData(key, value) {
    let data = null;
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (metadata[i][key] === value) {
        data = metadata[i];
        break;
      }
    }
    return data;
  }

  render() {
    // TODO: improve this
    const pathname = this.props.location.pathname;
    const currentData = this.getData('pathname', 'explore');

    return (
      <div>
        <header className="l-header -expanded">
          <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={'/'} className="logo">
                  <img src={logoImage} alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
        </header>

        {this.props.children}
      </div>
    );
  }

}

export default Explore;
