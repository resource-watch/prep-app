import React from 'react';
import Button from '../Button/Button';

class FilterTabs extends React.Component {
  constructor() {
    super();

    this.filters = {
      topics: { 'flooding': 'Flooding', 'Energy': 'Energy', 'weather-climate': 'Weather climate', 'infrastructure': 'Infrastructure' },
      spatialExtent: { global: 'Global', country: 'Country', region: 'Region' },
      dataType: { model: 'Model', observation: 'Observation', historical: 'Historical', projections: 'Projections' }
    };

    this.state = {
      filterOpen: false,
      filterSelected: ''
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
          <span className={filterChoosen && filterChoosen.indexOf(key) > -1 ? 'selected' : ''}></span>
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
    const filtersCount = {
      topics: filterChoosen['topics'] && filterChoosen['topics'].length ? filterChoosen['topics'].length : '',
      spatialExtent: filterChoosen['spatialExtent'] && filterChoosen['spatialExtent'].length ? filterChoosen['spatialExtent'].length : '',
      dataType: filterChoosen['dataType'] && filterChoosen['dataType'].length ? filterChoosen['dataType'].length : '',
    };

    return (
      <div className="filters-tab">
        <ul className="filters-toolbar">
          <li>
            <Button themeColor click={() => this.openFilter('topics')}> Topics </Button>
            <span>{filtersCount.topics}</span>
          </li>
          <li>
            <Button themeColor click={() => this.openFilter('spatialExtent')}> Spatial extent </Button>
            <span>{filtersCount.spatialExtent}</span>
          </li>
          <li>
            <Button themeColor click={() => this.openFilter('dataType')}> Data type </Button>
            <span>{filtersCount.dataType}</span>
          </li>
        </ul>

        {this.state.filterOpen &&
          <ul className="filters-list">{filters}</ul>
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
