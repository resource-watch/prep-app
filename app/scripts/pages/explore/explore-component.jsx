import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import MainNav from 'components/Navigation/MainNav';
import Tabs from 'components/ui/Tabs';
import Search from 'components/ui/Search';
import Icon from 'components/ui/Icon';
import DatasetLocationFilter from './explore-location-filter';
import CoreDatasetsList from './core-datasets-list';
import DatasetsList from './explore-datasets-list';
import DatasetInfo from './explore-dataset-info';
import ExploreMap from './explore-map';
import { tabOptions } from './explore-constants';

class ExplorePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarHidden: props.isSidebarHidden
    };
  }

  componentWillMount() {
    this.props.initialURLParams();
  }

  componentDidMount() {
    this.props.updateURLParams();
    this.props.fetchDatasets();
  }

  render() {
    const { selectedDataset, isSidebarHidden,
      currentTab, setTab, filterQuery, toggleInfo } = this.props;

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

        {/* Datasets list */}
        <div className={['c-explore-sidebar', isSidebarHidden ? '' : '-open'].join(' ')}>
          <div className="sidebar-container">
            <header className="sidebar-header">
              <h1 className="sidebar-title">Explore</h1>
              <Tabs
                className="-center"
                options={tabOptions}
                selected={currentTab || tabOptions[0].value}
                onChange={setTab}
              />
            </header>

            <div className="content">
              <div className="c-datasets-list">
                {currentTab === 'core_datasets' &&
                  <div className="datasets-list-content">
                    <DatasetLocationFilter />
                    <div className="list-container">
                      <CoreDatasetsList />
                      <footer className="sidebar-footer">
                        <p>These datasets are a curated collection. If you don&apos;t find what you are interested in, you can explore all the data:</p>

                        <div className="footer-actions">
                          <button
                            type="button"
                            className="c-new-button -light -transparent"
                            onClick={() => setTab('all_datasets')}
                          >
                            Browse all datasets
                          </button>
                        </div>
                      </footer>
                    </div>
                  </div>}
                {currentTab === 'all_datasets' &&
                  <div className="datasets-list-content">
                    <div className="list-filters">
                      <div className="list-filters-container">
                        {<Search
                          onChange={filterQuery}
                          label="Search dataset"
                        />}
                      </div>
                    </div>
                    <DatasetsList />
                  </div>}
              </div>
            </div>
          </div>
        </div>

        {/* Datasets panel info */}
        <div className={`c-info-sidebar ${selectedDataset ? '-open' : ''}`}>
          <div className="actions">
            <div>
              <button
                className="toggle-status"
                onClick={() => toggleInfo(selectedDataset)}
              >
                <Icon name="icon-arrow-left" className="-medium" />
              </button>
            </div>
          </div>
          <DatasetInfo />
        </div>

        {/* Map */}
        <ExploreMap />
      </div>
    );
  }
}

ExplorePage.defaultProps = {
  currentTab: 'core_datasets',
  isSidebarHidden: false,
  fetchDatasets: () => {}
};

ExplorePage.propTypes = {
  selectedDataset: PropTypes.object,
  currentTab: PropTypes.oneOf(['core_datasets', 'all_datasets']),
  setTab: PropTypes.func,
  isSidebarHidden: PropTypes.bool,
  fetchDatasets: PropTypes.func,
  filterQuery: PropTypes.func,
  toggleInfo: PropTypes.func,
  initialURLParams: PropTypes.func,
  updateURLParams: PropTypes.func
};

export default ExplorePage;
