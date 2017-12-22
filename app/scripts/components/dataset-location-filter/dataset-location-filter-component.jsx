import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'components/ui/Tabs';

// data
import datasetLocations from './dataset-location-filter-data';

class DatasetLocationFilter extends PureComponent {
  render() {
    const { onClickLocation, location } = this.props;

    return (
      <div className="c-dataset-location-filter">
        <Tabs
          options={datasetLocations}
          className="-center -light"
          onChange={(value) => { onClickLocation(value); }}
          selected={location}
        />
      </div>
    );
  }
}

DatasetLocationFilter.propTypes = {
  location: PropTypes.string.isRequired,
  onClickLocation: PropTypes.func.isRequired
};

DatasetLocationFilter.defaultProps = {
  location: 'global',
  onClickLocation: () => {}
};

export default DatasetLocationFilter;
