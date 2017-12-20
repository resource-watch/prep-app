import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DatasetFilter from 'components/dataset-filter/dataset-filter';

// constants
import PLACEHOLDERS_DATASET_FILTERS from './explore-dataset-filters-constants';

class ExploreDatasetFilters extends PureComponent {
  onChange(value, key) {
    this.props.setFilter({ [key]: value });
  }

  renderFilters() {
    const { data } = this.props;

    const filters = Object.keys(data).map(key =>
      (<DatasetFilter
        key={key}
        data={data[key]}
        placeholderText={PLACEHOLDERS_DATASET_FILTERS[key]}
        onChange={({ value }) => this.onChange(value, key)}
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
