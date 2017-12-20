import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DatasetFilter from 'components/dataset-filter/dataset-filter';

// constants
import PLACEHOLDERS_DATASET_FILTERS from './explore-dataset-filters-constants';

class ExploreDatasetFilters extends PureComponent {
  onChange(values = [], key) {
    const filterValues = values.map(v => v.value);
    this.props.setFilter({ [key]: filterValues });
  }

  renderFilters() {
    const { data } = this.props;

    const filters = Object.keys(data).map(key =>
      (<DatasetFilter
        key={key}
        data={data[key]}
        placeholderText={PLACEHOLDERS_DATASET_FILTERS[key]}
        onChange={(currentNode, selectedNodes) => this.onChange(selectedNodes, key)}
      />)
    );

    return (
      <div className="filters-container">
        {filters}
      </div>
    );
  }

  render() {
    return (
      <div className="c-explore-dataset-filters">
        {this.renderFilters()}
      </div>
    );
  }
}

ExploreDatasetFilters.propTypes = {
  data: PropTypes.object,
  setFilter: PropTypes.func
};

ExploreDatasetFilters.defaultProps = {
  data: {}
};

export default ExploreDatasetFilters;
