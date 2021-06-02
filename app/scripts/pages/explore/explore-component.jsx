import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router';
import Tour from 'reactour';

import { logEvent } from 'helpers/analytics';

import MainNav from 'layout/navigation/MainNav';
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
import DiscoverDataModal from 'components/Modal/DiscoverDataModal';

function logSearchEvent(query) { // eslint-disable-line class-methods-use-this
  logEvent('Explore menu', 'Search datasets', query);
}

function shouldShowTour() {
  return !localStorage.getItem(LOCAL_STORAGE_TOUR_KEY);
}

export const LOCAL_STORAGE_TOUR_KEY = 'exploreTour';

const steps = [
  {
    selector: '.dataset-group',
    content: 'Expand a category to view datasets, providers an layers in the map.'
  },
  {
    selector: '.dataset-group .collapsible-title',
    content: 'Click the dataset toggle to quickly view maps and learn more by following the i icon or click on dataset name or Learn More link to take a deeper study of information.',
    action: (node) => node.click(),
  },
  {
    selector: '.c-dataset-location-filter',
    content: 'Select global dataset of select dataset by country.',
  },
  {
    selector: '.c-explore-sidebar .c-tabs',
    content: 'Explore categorized datasets or select all datasets to find full data library.',
  },
  {
    selector: '.c-search-control.-locations',
    content: 'Click magnifying glass and search for a location to zoom to an area of interest.',
  },
  {
    selector: '.c-share-control.-share',
    content: 'Click this button to share maps on social networks or create an embed for your articles, websites, and dashboards.',
  }
];

const ExplorePage = (props) => {
  const { currentLocation, setTab, sidebar, status, selectedDataset, currentTab, toggleInfo } = props;
  const [filters, setFilters] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const sidebarExploreClass = classnames({
    'c-explore-sidebar': true,
    '-open': sidebar.open
  });

  const handleFinishTour = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_TOUR_KEY, 'false');
    setIsTourOpen(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (shouldShowTour()) {
      setIsTourOpen(true);
    }
  }, []);

  const onChangeTab = useCallback((tab) => {
    setTab(tab);

    const label = (tab === 'all_datasets')
      ? 'All datasets'
      : `Core ${currentLocation}`;
    logEvent('Explore menu', 'Changes dataset view', label);
  }, [currentLocation]);

  const onSearch = useCallback((query) => {
    props.filterQuery(query);
    logSearchEvent(query);
  }, []);

  const handleFilters = useCallback(() => {
    setFilters(!filters);
  }, [filters]);

  const onToggleSidebar = useCallback(() => {
    const { setSidebar } = props;

    setSidebar({
      width: (sidebar.open) ? 0 : 430,
      open: !sidebar.open,
    });

    if (!sidebar.open) {
      logEvent('Explore menu', 'Close menu', 'Click');
    }
  }, [sidebar, props.setSidebar]);

  useEffect(() => {
    const {
      fetchCoreDatasets,
      fetchDatasets,
      fetchLocations,
      getDatasetsByGraph,
      initialURLParams,
      setSidebar,
      updateURLParams,
    } = props;

    initialURLParams();
    updateURLParams();
    getDatasetsByGraph();
    fetchLocations();
    fetchDatasets();
    fetchCoreDatasets();
    setSidebar({ width: 430, open: true });
  }, []);

  console.log(status)

  return (
    <div className="l-explore">
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

      {/* Datasets list */}
      <div className={sidebarExploreClass}>
        <div className="sidebar-container">
          <header className="sidebar-header">
            <h1 className="sidebar-title">Explore</h1>
            <Tabs
              className="-center"
              options={tabOptions}
              selected={currentTab || tabOptions[0].value}
              onChange={onChangeTab}
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
                            onClick={() => this.onChangeTab('all_datasets')}
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
                      <button className="btn-filters" onClick={handleFilters}>
                        <span>Filter results</span>
                        {filters ?
                          <Icon name="icon-arrow-up" /> :
                          <Icon name="icon-arrow-down" />
                        }
                      </button>
                      {<Search
                        onChange={onSearch}
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
        {!selectedDataset &&
          <div className="actions">
            <div>
              <button
                className="toggle-status"
                onClick={onToggleSidebar}
              >
                {sidebar.open ?
                  <Icon name="icon-arrow-right" className="-medium" /> :
                  <Icon name="icon-arrow-left" className="-medium" />}
              </button>
            </div>
          </div>}
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
      <DiscoverDataModal onClose={handleCloseModal} />
      <Tour
        steps={steps}
        isOpen={(!!status && status === 'success' && isTourOpen)}
        onRequestClose={handleFinishTour}
      />
    </div>
  );
}

ExplorePage.defaultProps = {
  currentTab: 'core_datasets',
  fetchDatasets: () => null,
  fetchLocations: () => null,
  fetchCoreDatasets: () => null,
  getDatasetsByGraph: () => null,
};

ExplorePage.propTypes = {
  sidebar: PropTypes.object,
  selectedDataset: PropTypes.object,
  status: PropTypes.string,
  currentTab: PropTypes.oneOf(['core_datasets', 'all_datasets']),
  currentLocation: PropTypes.string,
  setTab: PropTypes.func,
  setSidebar: PropTypes.func,
  fetchLocations: PropTypes.func,
  fetchDatasets: PropTypes.func,
  fetchCoreDatasets: PropTypes.func,
  filterQuery: PropTypes.func,
  toggleInfo: PropTypes.func,
  initialURLParams: PropTypes.func,
  updateURLParams: PropTypes.func,
  getDatasetsByGraph: PropTypes.func,
};

export default ExplorePage;
