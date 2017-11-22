import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import Icon from 'components/ui/Icon';

// styles
import './dataset-filter-styles.scss';

class DatasetFilter extends PureComponent {
  constructor(props) {
    super(props);
    const { filtersConfig } = this.props;
    const { filtersNames, filters } = filtersConfig;

    this.filtersNames = filtersNames;
    this.filters = filters;
  }

  renderFilterOptions() {
    const { filtersChoosen, currentFilter, onClickTag } = this.props;
    const layers = [];

    const filterChoosen = filtersChoosen[currentFilter];
    const filters = this.filters[currentFilter];

    Object.keys(filters).forEach((key, index) => {
      layers.push((
        <li key={`filter-tag-${index}`} onClick={() => onClickTag(key)}>
          <span className={filterChoosen && filterChoosen.indexOf(key) > -1 ? 'checkbox -selected' : 'checkbox'}>
            <Icon name="icon-check" />
          </span>
          <span className="filter-label">{filters[key]}</span>
        </li>
      ));
    });

    return layers;
  }

  render() {
    const { visibility, onOpenFilter, onCloseFilter, currentFilter, filtersChoosen } = this.props;
    const filtersCount = {
      topics: (filtersChoosen.topics || []).length,
      geography: (filtersChoosen.geography || []).length,
      dataType: (filtersChoosen.dataType || []).length
    };

    return (
      <div className="filters-tab">
        <ul className="filters-toolbar  columns small-12">
          <li className={`filter-type ${currentFilter === 'geography' ? '-selected' : ''}`}>
            <Button click={() => onOpenFilter('geography')}> {this.filtersNames.geography} </Button>
            <span className={filtersCount.geography === 0 ? '-hide' : ''}>{filtersCount.geography}</span>
          </li>
          <li className={`filter-type ${currentFilter === 'topics' ? '-selected' : ''}`}>
            <Button click={() => onOpenFilter('topics')}> {this.filtersNames.topics} </Button>
            <span className={filtersCount.topics === 0 ? '-hide' : ''}>{filtersCount.topics}</span>
          </li>
          <li className={`filter-type ${currentFilter === 'dataType' ? '-selected' : ''}`}>
            <Button click={() => onOpenFilter('dataType')}> {this.filtersNames.dataType} </Button>
            <span className={filtersCount.dataType === 0 ? '-hide' : ''}>{filtersCount.dataType}</span>
          </li>
        </ul>

        {visibility &&
          <div className="filters-list-container columns small-12">
            <header className="filter-type-header">
              <h3>Filters by {this.filtersNames[currentFilter]}</h3>
              <button className="close-button" title="Close this modal" onClick={() => onCloseFilter()}>
                <Icon name="icon-cross" />
              </button>
            </header>
            <ul className="filters-list">
              {this.renderFilterOptions()}
            </ul>
          </div>}
      </div>
    );
  }
}

DatasetFilter.propTypes = {
  visibility: PropTypes.bool,
  currentFilter: PropTypes.string,
  filtersChoosen: PropTypes.object,
  filtersConfig: PropTypes.object,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  onClickTag: PropTypes.func
};

DatasetFilter.defaultProps = {
  // visiblity of the filter
  visibility: false,
  // current filter family displaying
  currentFilter: null,
  // current filters selected
  filtersChoosen: {},
  // data provided to filters
  filtersConfig: {},
  setFilterVisibility: () => {},
  onOpenFilter: () => {},
  onCloseFilter: () => {},
  onClickTag: () => {}
};

export default DatasetFilter;
