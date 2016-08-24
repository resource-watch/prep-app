import React from 'react';
import Button from '../Button/Button';

class FilterTabs extends React.Component {
  constructor() {
    super();

    this.state = {
      filterOpen: false,
      filterSelected: ''
    };

    this.filtersName = {
      topics: 'topics',
      spatialExtent: 'spatial extend',
      dataType: 'data type'
    };

    this.filters = {
      topics: { 'flooding': 'Flooding', 'Energy': 'Energy', 'weather-climate': 'Weather climate', 'infrastructure': 'Infrastructure' },
      spatialExtent: { global: 'Global', country: 'Country', region: 'Region' },
      dataType: { model: 'Model', observation: 'Observation', historical: 'Historical', projections: 'Projections' }
    };
  }

  componentWillMount() {
    let { activeFilters } = this.context.location.query;
    const setDatasetFilter = this.props.setDatasetFilter;
    const filters = this.filters;
    if (activeFilters) {
      activeFilters = activeFilters.split(',');
      Object.keys(filters).forEach((key) => {
        for (let i = activeFilters.length - 1; i >= 0; i--) {
          if (filters[key][activeFilters[i]]) {
            setDatasetFilter(key, activeFilters[i]);
          }
        }
      });
    }
  }

  onClickTag(tag) {
    this.props.setDatasetFilter(this.state.filterSelected, tag);
    this.closeFilter();
  }

  getFilters() {
    const layers = [];
    if (!this.state.filterOpen) {
      return null;
    }
    const filterChoosen = this.props.filtersChoosen[this.state.filterSelected];
    const filters = this.filters[this.state.filterSelected];
    Object.keys(filters).forEach((key, index) => {
      layers.push((
        <li key={`filter-tag-${index}`} onClick={() => this.onClickTag(key)}>
          <span className={filterChoosen && filterChoosen.indexOf(key) > -1 ? 'checkbox -selected' : 'checkbox'}>
            <svg width="13" height="9" viewBox="0 0 13 9"><title>Selected</title><path d="M5.744 6.997l6.514-5.465L10.972 0 4.46 5.464 1.176 3.078 0 4.696l4.854 3.527.89-1.226z" fill="#FFF" fillRule="evenodd"/></svg>
          </span>
          <span>{filters[key]}</span>
        </li>
      ));
    });
    return layers;
  }

  openFilter(filter) {
    this.setState({ filterOpen: true, filterSelected: filter });
  }

  closeFilter() {
    this.setState({ filterOpen: false });
  }

  render() {
    const filters = this.getFilters();
    const filterChoosen = this.props.filtersChoosen;

    let pointerPosition = 30;
    switch (this.state.filterSelected) {
      case 'spatialExtent':
        pointerPosition = 160;
        break;
      case 'dataType':
        pointerPosition = 290;
        break;
      default:

    }

    const filtersCount = {
      topics: filterChoosen['topics'] && filterChoosen['topics'].length ? filterChoosen['topics'].length : 0,
      spatialExtent: filterChoosen['spatialExtent'] && filterChoosen['spatialExtent'].length ? filterChoosen['spatialExtent'].length : 0,
      dataType: filterChoosen['dataType'] && filterChoosen['dataType'].length ? filterChoosen['dataType'].length : 0,
    };

    return (
      <div className="filters-tab">
        <ul className="filters-toolbar  columns small-12">
          <li>
            <Button themeColor click={() => this.openFilter('topics')}> {this.filtersName.topics} </Button>
            <span className={filtersCount.topics === 0 ? '-hide' : ''}>{filtersCount.topics}</span>
          </li>
          <li>
            <Button themeColor click={() => this.openFilter('spatialExtent')}> {this.filtersName.spatialExtent} </Button>
            <span className={filtersCount.spatialExtent === 0 ? '-hide' : ''}>{filtersCount.spatialExtent}</span>
          </li>
          <li>
            <Button themeColor click={() => this.openFilter('dataType')}> {this.filtersName.dataType} </Button>
            <span className={filtersCount.dataType === 0 ? '-hide' : ''}>{filtersCount.dataType}</span>
          </li>
        </ul>

        {this.state.filterOpen &&
          <div className="filters-list-container columns small-12">
            <span style={{ transform: `translateX(${pointerPosition}px)` }} className="pointer"></span>
            <h3>Filters by {this.filtersName[this.state.filterSelected]}</h3>
            <svg className="close-button" title="Close this modal" onClick={() => this.closeFilter()}>
              <path d="M8.047.548l-3 3L2.025.524l-1.5 1.5 3.023 3.022-3 3 1.455 1.456 3-3 3.023 3.022 1.5-1.5-3.023-3.022 3-3" fillRule="evenodd"/>
            </svg>
            <ul className="filters-list">
              {filters}
            </ul>
          </div>
        }
      </div>
    );
  }
}

FilterTabs.contextTypes = {
  location: React.PropTypes.object
};

FilterTabs.propTypes = {
  setDatasetFilter: React.PropTypes.func.isRequired,
  filtersChoosen: React.PropTypes.object
};

export default FilterTabs;
