import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { logEvent } from 'helpers/analytics';

import Tabs from 'components/ui/Tabs';

// data
import datasetLocations from './explore-location-filter-data';

class DatasetLocationFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.onChangeLocation = this.onChangeLocation.bind(this);
  }

  onChangeLocation(location) {
    this.props.setLocation(location);

    const label = `Core ${location}`;
    logEvent('Explore menu', 'Changes dataset view', label);
  }

  render() {
    const { location } = this.props;

    return (
      <div className="c-dataset-location-filter">
        <Tabs
          options={datasetLocations}
          className="-center -light"
          onChange={this.onChangeLocation}
          selected={location}
        />
      </div>
    );
  }
}

DatasetLocationFilter.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired
};

DatasetLocationFilter.defaultProps = {
  location: 'global',
  setLocation: () => {}
};

export default DatasetLocationFilter;
