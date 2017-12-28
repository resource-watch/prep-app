import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import MainNav from 'components/Navigation/MainNav';
import Tabs from 'components/ui/Tabs';

import { TABS_OPTIONS } from 'constants';

class ExplorePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarHidden: props.isSidebarHidden
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { isSidebarHidden, currentTab } = this.props;

    return (
      <div className="l-explore -theme-2">
        <header className="l-header -expanded">
          <div className="l-header-nav -short">
            <div className="row align-middle">
              <div className="column small-10 medium-4">
                <Link to={'/'} className="logo">
                  <img src="/images/prep-logo.png" alt="Partnership for Resilience and Preparedness" />
                </Link>
              </div>
              <div className="column small-2 medium-8">
                <MainNav />
              </div>
            </div>
          </div>
        </header>

        <div className={['c-explore-sidebar', isSidebarHidden ? '' : '-open'].join(' ')}>
          <div className="sidebar-container">
            <header className="sidebar-header">
              <h1 className="sidebar-title">Explore</h1>
              <Tabs
                className="-center"
                options={TABS_OPTIONS}
                selected={currentTab || TABS_OPTIONS[0].value}
                onChange={this.props.onChangeTab}
              />
            </header>

            <div className="content">
              {/*currentTab === 'core_datasets' && <CoreDatasets />*/}
              {/*currentTab === 'all_datasets' && <AllDatasets />*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExplorePage.defaultProps = {
  currentTab: 'core_datasets',
  isSidebarHidden: false
};

ExplorePage.propTypes = {
  currentTab: PropTypes.oneOf(['core_datasets', 'all_datasets']),
  onChangeTab: PropTypes.func,
  isSidebarHidden: PropTypes.bool
};

export default ExplorePage;
