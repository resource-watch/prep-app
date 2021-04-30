import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { logEvent } from 'helpers/analytics';
import initialState from './explore-location-filter-initial-state';
import boundingBoxCountries from './country-bounding-boxes.json';

class DatasetLocationFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { countryisActive: false };
    this.onChangeLocation = this.onChangeLocation.bind(this);
  }

  async onChangeLocation(location) {
    const { setLocation } = this.props;
    setLocation(location);
    await this.setBoundsByLocation(location);
    // GA event
    const label = `Core ${location}`;
    logEvent('Explore menu', 'Changes dataset view', label);
  }

  setBoundsByLocation(location) {
    const { setMapParams, setBBox } = this.props;
    return new Promise(resolve => {
      if (!location || location === initialState.location) {
        setMapParams({ lat: 24.44714958973082, lng: -66.97265625000001, zoom: 3 });
        resolve();
      } else {
        const geojson = boundingBoxCountries.features.find(({ properties }) => properties.iso3 === location);
        const bounds = L.geoJSON(geojson).getBounds();
        setBBox(bounds);
        resolve();
      }
    });
  }

  handleHover(newState) {
    this.setState(newState);
  }

  render() {
    const { location, countries } = this.props;
    const { countryisActive } = this.state;
    const onlyCountries = countries.filter(c => c.value !== initialState.location);
    const currentLocation = countries.find(c => c.value === location);

    return (
      <div className="c-dataset-location-filter">
        <ul className="c-dataset-location-filter-tabs">
          <li>
            <button
              type="button"
              className={location === initialState.location ? '-active' : ''}
              onClick={() => this.onChangeLocation(initialState.location)}
            >
              Global
            </button>
          </li>
          <li
            onMouseEnter={() => this.handleHover({ countryisActive: true })}
            onMouseLeave={() => this.handleHover({ countryisActive: false })}
          >
            <span className={location !== initialState.location ? '-active' : ''}>
              {(location === initialState.location || !currentLocation) ? 'Select a country' : currentLocation.label}
            </span>
            {countryisActive && (
              <div className="submenu">
                <ul className="submenu-list">
                  {(
                    onlyCountries.map(c => (
                      <li key={c.id}>
                        <button type="button" onClick={() => this.onChangeLocation(c.value)}>
                          {c.label}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    );
  }
}

DatasetLocationFilter.propTypes = {
  countries: PropTypes.array,
  location: PropTypes.string,
  setLocation: PropTypes.func,
  setBBox: PropTypes.func,
  setMapParams: PropTypes.func
};

DatasetLocationFilter.defaultProps = {
  location: initialState.location,
  countries: [],
  setLocation: () => {},
  setBBox: () => {},
  setMapParams: () => {}
};

export default DatasetLocationFilter;
