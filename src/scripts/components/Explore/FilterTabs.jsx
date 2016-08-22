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

    return (
      <div className="filters-tab">
        <ul className="filters-toolbar">
          <li>
            <Button themeColor click={() => this.openFilter('topics')}> Topics </Button>
          </li>
          <li>
            <Button themeColor click={() => this.openFilter('spatialExtent')}> Spatial extent </Button>
          </li>
          <li>
            <Button themeColor click={() => this.openFilter('dataType')}> Data type </Button>
          </li>
        </ul>

        {this.state.filterOpen &&
          <ul className="filters-list">{filters}</ul>
        }
      </div>
    );
  }
}

FilterTabs.propTypes = {
  setDatasetFilter: React.PropTypes.func.isRequired,
  filtersChoosen: React.PropTypes.object
};

export default FilterTabs;
