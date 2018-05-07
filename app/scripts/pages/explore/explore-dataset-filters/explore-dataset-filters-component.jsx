import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';

import { logEvent } from 'helpers/analytics';

import TreeSelector from 'components/tree-selector/tree-selector';

// constants
import PLACEHOLDERS_DATASET_FILTERS from './explore-dataset-filters-constants';

import './explore-dataset-filters-styles.scss';

class ExploreDatasetFilters extends PureComponent {
  componentWillUnmount() {
    this.onClearFilters();
  }

  onChange(values = [], key) {
    const filterValues = values.map(v => v.value);
    this.props.onSetDatasetFilter({ [key]: filterValues });
    this.props.getDatasetsByGraph();

    let action = 'Topic Filter';
    if (key === 'geographies') {
      action = 'Geographies';
    } else if (key === 'dataTypes') {
      action = 'Data Types';
    }
    logEvent('Explore menu', action, filterValues.join(', '));
  }

  /**
   * Event handler executed when the user clicks the
   * "clear filters" button
   */
  onClearFilters() {
    this.props.onClearFilters();
    logEvent('Explore menu', 'Clear filter', 'Click');
  }

  renderFilters() {
    const { data } = this.props;

    const filters = Object.keys(data).map(key =>
      (<TreeSelector
        key={key}
        data={sortBy(data[key], item => (item.value === 'global' ? 0 : 1))}
        placeholderText={PLACEHOLDERS_DATASET_FILTERS[key]}
        onChange={(currentNode, selectedNodes) => this.onChange(selectedNodes, key)}
      />));

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
            <div className="button-container">
              <button
                type="button"
                className="c-new-button -light -transparent"
                onClick={() => this.onClearFilters()}
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExploreDatasetFilters.propTypes = {
  data: PropTypes.object,
  onSetDatasetFilter: PropTypes.func,
  getDatasetsByGraph: PropTypes.func,
  onClearFilters: PropTypes.func
};

ExploreDatasetFilters.defaultProps = { data: {} };

export default ExploreDatasetFilters;
