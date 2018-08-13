import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import { Link } from 'react-router';

import { logEvent } from 'helpers/analytics';

import MainNav from 'components/Navigation/MainNav';
import Tabs from 'components/ui/Tabs';
import Search from 'components/ui/Search';
import Icon from 'components/ui/Icon';

// import DatasetLocationFilter from './explore-location-filter';
import ExploreDatasetFilters from './explore-dataset-filters/explore-dataset-filters';
import CoreDatasetsList from './core-datasets-list';
import DatasetsList from './explore-datasets-list';
import DatasetInfo from './explore-dataset-info';
import ExploreMap from './explore-map';
import { tabOptions } from './explore-constants';

class ExplorePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { filters: false };

    this.onChangeTab = this.onChangeTab.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.logSearchEvent = debounce(this.logSearchEvent, 500);
  }

  componentWillMount() {
    this.props.initialURLParams();
    this.props.getDatasetsByGraph();
    if (this.props.countryISO) this.props.setLocation(this.props.countryISO);
  }

  componentDidMount() {
    this.props.updateURLParams();
    this.props.fetchLocations();
    this.props.fetchDatasets();
    this.props.fetchCoreDatasets();

    this.props.setSidebar({
      width: 430,
      open: true
    });
  }

  /**
   * Event handler executed when the user goes from
   * one tab to another
   * @param {string} tab Tab name
   */
  onChangeTab(tab) {
    this.props.setTab(tab);

    const label = (tab === 'all_datasets')
      ? 'All datasets'
      : `Core ${this.props.currentLocation}`;
    logEvent('Explore menu', 'Changes dataset view', label);
  }

  /**
   * Event handler executed when the user types some
   * terms in the search field
   * @param {string} query Search terms
   */
  onSearch(query) {
    this.props.filterQuery(query);
    this.logSearchEvent(query);
  }

  /**
   * Event handler executed when the user toggles
   * the sidebar
   */
  onToggleSidebar() {
    const { sidebar } = this.props;

    this.props.setSidebar({
      width: (sidebar.open) ? 0 : 430,
      open: !sidebar.open
    });

    if (!sidebar.open) {
      logEvent('Explore menu', 'Close menu', 'Click');
    }
  }

  /**
   * Log the search events
   * NOTE: this function is debounced in the constructor
   * @param {string} query Search terms
   */
  logSearchEvent(query) { // eslint-disable-line class-methods-use-this
    logEvent('Explore menu', 'Search datasets', query);
  }

  render() {
    const { sidebar, selectedDataset, currentTab, toggleInfo, countries, countryISO, embed } = this.props;
    const { filters } = this.state;
    const currentCountry = countries.find(c => c.iso === countryISO);

    const sidebarExploreClass = classnames({
      'c-explore-sidebar': true,
      '-open': sidebar.open,
      '-embed': embed
    });

    return (
      <div className="l-explore">
        {!embed && (
          <header className="l-header -expanded">
            <div className="l-header-nav -short">
              <div className="row align-middle">
                <div className="column small-10 medium-4">
                  <Link to="/" className="logo">
                    <img src="/images/prep-logo.png" alt="Partnership for Resilience and Preparedness" />
                  </Link>
                </div>
                <div className="column small-2 medium-8">
                  <MainNav />
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Datasets list */}
        <div className={sidebarExploreClass}>
          <div className="sidebar-container">
            <header className="sidebar-header">
              <h1 className="sidebar-title">
                {currentCountry && currentCountry.name}
              </h1>
              <Tabs
                className="-center"
                options={tabOptions}
                selected={currentTab || tabOptions[0].value}
                onChange={this.onChangeTab}
              />
            </header>

            <div className="content">
              <div className="c-datasets-list">
                {currentTab === 'core_datasets' && (
                  <div className="datasets-list-content">
                    {/* <DatasetLocationFilter /> */}
                    <div className="list-container">
                      <CoreDatasetsList embed={embed} />
                      <footer className="sidebar-footer">
                        <div className="footer-section">
                          <p>
                            These datasets are a curated collection. If you don&apos;t find what you are interested in, you can explore all the data:
                          </p>

                          <div className="footer-actions">
                            <button
                              type="button"
                              className="c-new-button -light -transparent"
                              onClick={() => this.onChangeTab('all_datasets')}
                            >
                              Browse all datasets
                            </button>
                          </div>
                        </div>
                        <div className="footer-section">
                          <p>
                            We’re actively adding new datasets to PREP. If you can’t find what you’re looking for, you can suggest a dataset for us to consider:
                          </p>
                          <div className="footer-actions">
                            <a href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true" target="_blank" rel="noopener noreferrer">
                              <button type="button" className="c-new-button -light -transparent">
                                Suggest dataset
                              </button>
                            </a>
                          </div>
                        </div>
                      </footer>
                    </div>
                  </div>
                )}
                {currentTab === 'all_datasets' && (
                  <div className="datasets-list-content">
                    <div className="list-filters">
                      <div className="list-filters-container">
                        <button type="button" className="btn-filters" onClick={() => this.setState({ filters: !filters })}>
                          <span>
                            Filter results
                          </span>
                          {filters ?
                            <Icon name="icon-arrow-up" /> :
                            <Icon name="icon-arrow-down" />
                          }
                        </button>
                        {<Search
                          onChange={this.onSearch}
                          label="Search dataset"
                        />}
                      </div>
                    </div>
                    {filters && <ExploreDatasetFilters />}
                    <DatasetsList embed={embed} />
                    <footer className="sidebar-footer -border">
                      <div className="footer-section">
                        <p>
                          We’re actively adding new datasets to PREP. If you can’t find what you’re looking for, you can suggest a dataset for us to consider:
                        </p>
                        <div className="footer-actions">
                          <a href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true" target="_blank" rel="noopener noreferrer">
                            <button type="button" className="c-new-button -light -transparent">
                              Suggest dataset
                            </button>
                          </a>
                        </div>
                      </div>
                    </footer>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!selectedDataset && (
            <div className="actions">
              <div>
                <button
                  type="button"
                  className="toggle-status"
                  onClick={() => this.onToggleSidebar()}
                >
                  {sidebar.open ?
                    <Icon name="icon-arrow-right" className="-medium" /> :
                    <Icon name="icon-arrow-left" className="-medium" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Datasets panel info */}
        <div className={`c-info-sidebar ${selectedDataset && '-open'} ${embed && '-embed-with-sidebar'}`}>
          <div className="actions">
            <div>
              <button
                type="button"
                className="toggle-status"
                onClick={() => toggleInfo(selectedDataset)}
              >
                <Icon name="icon-arrow-left" className="-medium" />
              </button>
            </div>
          </div>
          <DatasetInfo embed={embed} />
        </div>

        {/* Map */}
        <ExploreMap embed={embed} />
      </div>
    );
  }
}

ExplorePage.defaultProps = {
  currentTab: 'core_datasets',
  fetchDatasets: () => {},
  fetchCoreDatasets: () => {},
  getDatasetsByGraph: () => {}
};

ExplorePage.propTypes = {
  sidebar: PropTypes.object,
  selectedDataset: PropTypes.object,
  currentTab: PropTypes.oneOf(['core_datasets', 'all_datasets']),
  currentLocation: PropTypes.string,
  setTab: PropTypes.func,
  setSidebar: PropTypes.func,
  fetchDatasets: PropTypes.func,
  fetchCoreDatasets: PropTypes.func,
  filterQuery: PropTypes.func,
  toggleInfo: PropTypes.func,
  initialURLParams: PropTypes.func,
  updateURLParams: PropTypes.func,
  getDatasetsByGraph: PropTypes.func
};

export default ExplorePage;
