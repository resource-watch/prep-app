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
      filterSelected: '',
      tagSelected: ''
    };
  }

  getFilters() {
    const layers = [];
    if (!this.state.filterOpen) {
      return null;
    }
    const filterSelected = this.filters[this.state.filterSelected];
    Object.keys(filterSelected).forEach((key, index) => {
      layers.push((
        <li key={`filter-tag-${index}`} onClick={this.onClickTag.bind(this, key)}>
          <span>{filterSelected[key]}</span>
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

  selectTag(tag) {
    this.setState({ tagSelected: tag });
  }

  onClickTag(tag) {
    this.selectTag(tag);
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
   * Define the metadata info
   */
  onFilterClick: React.PropTypes.func
};

export default FilterTabs;
