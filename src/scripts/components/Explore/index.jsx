import React from 'react';
import { Link } from 'react-router';
import MainNav from '../../components/Navigation/MainNav';

import ExploreMap from '../../containers/Explore/ExploreMap';
import ExploreMapSidebar from '../../containers/Explore/ExploreSidebar';

import Button from '../Button/Button'

import metadata from 'json!../../metadata.json';
import logoImage from '../../../images/prep-logo.png';

class Explore extends React.Component {

  getChildContext() {
    return {
      location: {
        pathname: this.props.location.pathname,
        query: this.props.location.query,
        params: this.props.params
      }
    };
  }

  componentWillMount() {
    this.currentData = this.getData('pathname', 'explore');
    if (!this.props.data.list.length) {
      const { query } = this.props.params;
      if (query && query.activeDatasets) {
        this.props.getDatasets(query.activeDatasets.split(','));
      } else {
        this.props.getDatasets();
      }
    }
    document.title = this.currentData.title;
  }

  componentWillUpdate() {
    this.currentData = this.getData('pathname', 'explore');
    document.title = this.currentData.title;
  }

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
    const currentData = this.currentData;

    return (
      <div className="l-explore -theme-2">
        <header className="l-header -expanded">
          <div className={`l-header-nav -short ${currentData.name === 'home' ? '-no-bg' : ''}`}>
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
          <div className="l-header-tools-map">
            <Button themeColor click={() => console.log('TODO: open data portal')}> Open data portal </Button>
            <Button themeColor click={() => console.log('TODO: share')}> Share </Button>
          </div>
        </header>

        <ExploreMapSidebar />
        <ExploreMap />

      </div>
    );
  }
}

Explore.childContextTypes = {
  location: React.PropTypes.object
};

Explore.propTypes = {
  getDatasets: React.PropTypes.func.isRequired,
  data: React.PropTypes.any.isRequired,
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired
};

export default Explore;
