import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';

// data
import datasetLocations from './dataset-location-filter-data';

// styles
import './dataset-location-filter-styles.scss';

class DatasetLocationFilter extends PureComponent {
  render() {
    const { onClickLocation, location } = this.props;

    return (
      <div className="c-dataset-location-filter">
        <div className="row l-row">
          <ul className="c-tabs">
            {datasetLocations.map(locationOption =>
              (<li key={locationOption.id} className={`tab ${locationOption.value === location ? '-active' : ''}`}>
                <Button click={() => onClickLocation(locationOption.value)}> {locationOption.name} </Button>
              </li>)
            )}
          </ul>
        </div>
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
