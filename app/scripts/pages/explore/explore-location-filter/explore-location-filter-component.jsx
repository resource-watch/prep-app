import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { logEvent } from 'helpers/analytics';

import Tabs from 'components/ui/Tabs';

// data
import datasetLocations from './explore-location-filter-data';
import countryBoundingBoxes from './country-bounding-boxes.json';

class DatasetLocationFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.onChangeLocation = this.onChangeLocation.bind(this);
  }

  componentDidMount() {
    this.setBoundsByLocation(this.props.location);
  }

  onChangeLocation(location) {
    this.props.setLocation(location);
    this.setBoundsByLocation(location);
    // GA event
    const label = `Core ${location}`;
    logEvent('Explore menu', 'Changes dataset view', label);
  }

  setBoundsByLocation(location) {
    // Setting bounds after change depending on country
    const { iso } = datasetLocations.find(l => (l.value === location));
    if (iso) {
      const geojson = countryBoundingBoxes.features.find(c => (c.properties.iso3166 === iso));
      const bounds = L.geoJSON(geojson).getBounds();
      this.props.setBBox(bounds);
    } else {
      // default bounds
      this.props.setMapParams({ lat: 24.44714958973082, lng: -66.97265625000001, zoom: 3 });
    }
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
  setLocation: PropTypes.func.isRequired,
  setBBox: PropTypes.func,
  setMapParams: PropTypes.func
};

DatasetLocationFilter.defaultProps = {
  location: 'global',
  setLocation: () => {},
  setBBox: () => {},
  setMapParams: () => {}
};

export default DatasetLocationFilter;
