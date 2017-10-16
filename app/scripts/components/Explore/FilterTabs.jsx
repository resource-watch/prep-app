import React from 'react';

// Components
import Button from '../Button/Button';
import Icon from '../ui/Icon';

import filtersConfig from '../../../scripts/filters.json';

class FilterTabs extends React.Component {
  constructor() {
    super();

    this.state = {
      filterOpen: false,
      filterSelected: ''
    };

    this.filtersNames = filtersConfig.filtersNames;
    this.filters = filtersConfig.filters;
  }

  componentWillMount() {
    let { activeFilters } = this.context.location.query;
    const setDatasetFilter = this.props.setDatasetFilter;

    if (activeFilters) {
      activeFilters = activeFilters.split(',');
      Object.keys(filtersConfig.filters).forEach((key) => {
        for (let i = activeFilters.length - 1; i >= 0; i--) {
          const filter = activeFilters[i];
          if (filtersConfig.filters[key][filter]) {
            // defaults filters
            if (filter !== 'global' && filter !== 'national') {
              setDatasetFilter(key, filter);
            }
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
            <Icon name="icon-check" />
          </span>
          <span className="filter-label">{filters[key]}</span>
        </li>
      ));
    });
    return layers;
  }

  openFilter(filter) {
    if (this.state.filterOpen && filter === this.state.filterSelected) {
      this.closeFilter();
    } else {
      this.setState({ filterOpen: true, filterSelected: filter });
    }
  }

  closeFilter() {
    this.setState({ filterOpen: false });
  }

  render() {
    const { filterSelected } = this.state;
    const filters = this.getFilters();
    const filterChoosen = this.props.filtersChoosen;
    const filtersCount = {
      topics: filterChoosen.topics && filterChoosen.topics.length ? filterChoosen.topics.length : 0,
      geography: filterChoosen.geography && filterChoosen.geography.length ? filterChoosen.geography.length : 0,
      dataType: filterChoosen.dataType && filterChoosen.dataType.length ? filterChoosen.dataType.length : 0
    };

    return (
      <div className="filters-tab">
        <ul className="filters-toolbar  columns small-12">
          <li className={`filter-type ${filterSelected === 'geography' ? '-selected' : ''}`}>
            <Button click={() => this.openFilter('geography')}> {this.filtersNames.geography} </Button>
            <span className={filtersCount.geography === 0 ? '-hide' : ''}>{filtersCount.geography}</span>
          </li>
          <li className={`filter-type ${filterSelected === 'topics' ? '-selected' : ''}`}>
            <Button click={() => this.openFilter('topics')}> {this.filtersNames.topics} </Button>
            <span className={filtersCount.topics === 0 ? '-hide' : ''}>{filtersCount.topics}</span>
          </li>
          <li className={`filter-type ${filterSelected === 'dataType' ? '-selected' : ''}`}>
            <Button click={() => this.openFilter('dataType')}> {this.filtersNames.dataType} </Button>
            <span className={filtersCount.dataType === 0 ? '-hide' : ''}>{filtersCount.dataType}</span>
          </li>
        </ul>

        {this.state.filterOpen &&
        <div className="filters-list-container columns small-12">
          <header className="filter-type-header">
            <h3>Filters by {this.filtersNames[this.state.filterSelected]}</h3>
            <button className="close-button" title="Close this modal" onClick={() => this.closeFilter()}>
              <Icon name="icon-cross" />
            </button>
          </header>
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
