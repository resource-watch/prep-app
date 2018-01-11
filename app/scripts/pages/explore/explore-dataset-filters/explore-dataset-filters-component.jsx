import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TreeSelector from 'components/tree-selector/tree-selector';

// constants
import PLACEHOLDERS_DATASET_FILTERS from './explore-dataset-filters-constants';

import './explore-dataset-filters-styles.scss';

class ExploreDatasetFilters extends PureComponent {
  onChange(values = [], key) {
    const filterValues = values.map(v => v.value);
    this.props.onSetDatasetFilter({ [key]: filterValues });
    this.props.getDatasetsByGraph();
  }

  renderFilters() {
    const { data } = this.props;
    const filters = Object.keys(data).map(key =>
      (<TreeSelector
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
        <div className="row">
          <div className="column small-12">
            {this.renderFilters()}
          </div>
        </div>
      </div>
    );
  }
}

ExploreDatasetFilters.propTypes = {
  data: PropTypes.object,
  onSetDatasetFilter: PropTypes.func,
  getDatasetsByGraph: PropTypes.func
};

ExploreDatasetFilters.defaultProps = {
  data: {}
};

export default ExploreDatasetFilters;
