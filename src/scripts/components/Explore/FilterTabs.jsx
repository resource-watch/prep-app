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

  getFilters() {
    const layers = [];
    if (!this.state.filterOpen) {
      return null;
    }
    const filterSelected = this.props.filterSelected;
    const filters = this.filters[this.state.filterSelected];
    Object.keys(filters).forEach((key, index) => {
      layers.push((
        <li key={`filter-tag-${index}`} onClick={() => this.onClickTag(key)}>
          <span className={key === filterSelected ? 'selected' : ''}></span>
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

  onClickTag(tag) {
    this.props.setDatasetFilter(tag);
    this.closeFilter();
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
          <ul className="filters-list">{ filters }</ul>
        }
      </div>
    );
  }
}

FilterTabs.propTypes = {
  /**
   * Define functin to set the tag filter
   */
  setDatasetFilter: React.PropTypes.func.isRequired
};

export default FilterTabs;
