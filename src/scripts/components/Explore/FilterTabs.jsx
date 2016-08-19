import React from 'react';
import Button from '../Button/Button';

class FilterTabs extends React.Component {
  constructor() {
    super();

    this.filters = {
      topics: { 'flooding': 'Flooding', 'Energy': 'Energy', 'weather-climate': 'Weather climate', 'infrastructure': 'Infrastructure' },
      spatialExtent: { global: 'global', country: 'country', region: 'region' },
      dataType: { model: 'model', observation: 'observation', historical: 'historical', projections: 'projections' }
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
      layers.push(
        <li className="layer" key={`map-layer-${index}`}>
          <span className="title">{filterSelected[key]}</span>
        </li>
      );
    });
    return layers;
  }

  openFilter(filter) {
    this.setState({ filterOpen: true, filterSelected: filter });
  }

  selectTag(tag) {
    this.setState({ tagSelected: tag });
  }

  render() {
    const filters = this.getFilters();

    return (
      <div className="filters-tab">
        <ul>
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
          { filters }
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
