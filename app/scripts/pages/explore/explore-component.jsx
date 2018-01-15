import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router';
import MainNav from 'components/Navigation/MainNav';
import Tabs from 'components/ui/Tabs';
import Search from 'components/ui/Search';
import Icon from 'components/ui/Icon';
import DatasetLocationFilter from './explore-location-filter';
import ExploreDatasetFilters from './explore-dataset-filters/explore-dataset-filters';
import CoreDatasetsList from './core-datasets-list';
import DatasetsList from './explore-datasets-list';
import DatasetInfo from './explore-dataset-info';
import ExploreMap from './explore-map';
import { tabOptions } from './explore-constants';

class ExplorePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarHidden: props.isSidebarHidden,
      filters: false
    };
  }

  componentWillMount() {
    this.props.initialURLParams();
    this.props.getDatasetsByGraph();
  }

  componentDidMount() {
    this.props.updateURLParams();
    this.props.fetchDatasets();
  }

  render() {
    const { selectedDataset,
      currentTab, setTab, filterQuery, toggleInfo } = this.props;
    const { filters, isSidebarHidden } = this.state;

    const sidebarExploreClass = classnames({
      'c-explore-sidebar': true,
      '-open': !isSidebarHidden
    });

    return (
      <div className="l-explore">
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
        <div className={sidebarExploreClass}>
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
                        <div className="footer-section">
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
                        </div>
                        <div className="footer-section">
                          <p>We’re actively adding new datasets to PREP. If you can’t find what you’re looking for, you can suggest a dataset for us to consider:</p>
                          <div className="footer-actions">
                            <a href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true" target="_blank" rel="noopener noreferrer">
                              <button type="button" className="c-new-button -light -transparent">Suggest dataset</button>
                            </a>
                          </div>
                        </div>
                      </footer>
                    </div>
                  </div>}
                {currentTab === 'all_datasets' &&
                  <div className="datasets-list-content">
                    <div className="list-filters">
                      <div className="list-filters-container">
                        <button className="btn-filters" onClick={() => this.setState({ filters: !filters })}>
                          <span>Filter results</span>
                          {filters ?
                            <Icon name="icon-arrow-up" /> :
                            <Icon name="icon-arrow-down" />
                          }
                        </button>
                        {<Search
                          onChange={filterQuery}
                          label="Search dataset"
                        />}
                      </div>
                    </div>
                    {filters && <ExploreDatasetFilters />}
                    <DatasetsList />
                    <footer className="sidebar-footer -border">
                      <div className="footer-section">
                        <p>We’re actively adding new datasets to PREP. If you can’t find what you’re looking for, you can suggest a dataset for us to consider:</p>
                        <div className="footer-actions">
                          <a href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="c-new-button -light -transparent">Suggest dataset</button>
                          </a>
                        </div>
                      </div>
                    </footer>
                  </div>}
              </div>
            </div>
          </div>
          <div className="actions">
            <div>
              <button
                className="toggle-status"
                onClick={() => this.setState({ isSidebarHidden: !isSidebarHidden })}
              >
                {isSidebarHidden ?
                  <Icon name="icon-arrow-right" className="-medium" /> :
                  <Icon name="icon-arrow-left" className="-medium" />}
              </button>
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
  fetchDatasets: () => {},
  getDatasetsByGraph: () => {}
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
  updateURLParams: PropTypes.func,
  getDatasetsByGraph: PropTypes.func
};

export default ExplorePage;
