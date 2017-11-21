import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './dataset-filter-actions';
import reducers, { initialState } from './dataset-filter-reducer';
import DatasetFilterComponent from './dataset-filter-component';

import filtersConfig from './dataset-filter-data.json';

const mapStateToProps = state => ({
  visibility: state.datasetFilter.visibility,
  currentFilter: state.datasetFilter.currentFilter,
  filtersChoosen: state.datasets.filters
});

class DatasetFilterContainer extends Component {
  componentWillMount() {
    let { activeFilters } = this.context.location.query;
    const { setDatasetFilter } = this.props;

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

  onOpenFilter(filter) {
    const { setVisibility, setCurrentFilter, visibility, currentFilter } = this.props;

    if (visibility && filter === currentFilter) {
      this.onCloseFilter();
    } else {
      setVisibility(true);
      setCurrentFilter(filter);
    }
  }

  onCloseFilter() {
    const { setVisibility } = this.props;
    setVisibility(false);
  }

  onClickTag(tag) {
    const { currentFilter, setDatasetFilter } = this.props;

    setDatasetFilter(currentFilter, tag);
    this.onCloseFilter();
  }

  render() {
    const { visibility, currentFilter, filtersChoosen } = this.props;

    return createElement(DatasetFilterComponent, {
      ...this.props,
      visibility,
      currentFilter,
      filtersChoosen,
      filtersConfig,
      onOpenFilter: this.onOpenFilter.bind(this),
      onCloseFilter: this.onCloseFilter.bind(this),
      onClickTag: this.onClickTag.bind(this)
    });
  }
}

DatasetFilterContainer.contextTypes = {
  location: PropTypes.object
};

DatasetFilterContainer.propTypes = {
  visibility: PropTypes.bool,
  currentFilter: PropTypes.string,
  filtersChoosen: PropTypes.object,
  setVisibility: PropTypes.func,
  setCurrentFilter: PropTypes.func,
  setDatasetFilter: PropTypes.func
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(DatasetFilterContainer);
