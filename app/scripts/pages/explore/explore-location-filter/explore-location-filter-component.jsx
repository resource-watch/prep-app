import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { logEvent } from 'helpers/analytics';

import Tabs from 'components/ui/Tabs';

class DatasetLocationFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { countryisActive: false };
    this.onChangeLocation = this.onChangeLocation.bind(this);
  }

  async componentDidMount() {
    await this.setBoundsByLocation(this.props.location);
  }

  setBoundsByLocation(location) {
    return new Promise(resolve => {
      if (!location || location === 'global') {
        this.props.setMapParams({ lat: 24.44714958973082, lng: -66.97265625000001, zoom: 3 });
        return resolve();
      }

      fetch(`${config.apiUrlRW}/geostore/admin/${location}`)
        .then(response => response.json())
        .then(json => {
          const { bbox } = json.data.attributes;
          // const bounds = L.geoJSON(geojson).getBounds();
          this.props.setBBox(bbox);
          resolve();
        });
    });
  }

  async onChangeLocation(location) {
    this.props.setLocation(location);
    await this.setBoundsByLocation(location);
    // GA event
    const label = `Core ${location}`;
    logEvent('Explore menu', 'Changes dataset view', label);
  }

  handleHover(newState) {
    this.setState(newState);
  }

  render() {
    const { location, countries } = this.props;
    const { countryisActive } = this.state;
    const onlyCountries = countries.filter(c => c.value !== 'global');
    const currentLocation = countries.find(c => c.value === location);

    return (
      <div className="c-dataset-location-filter">
        <ul className="c-dataset-location-filter-tabs">
          <li><button type="button" className={location === 'global' && '-active'} onClick={() => this.onChangeLocation('global')}>Global</button></li>
          <li
            onMouseEnter={() => this.handleHover({ countryisActive: true })}
            onMouseLeave={() => this.handleHover({ countryisActive: false })}
          >
            <span className={location !== 'global' && '-active'}>{(location === 'global' || !currentLocation) ? 'Select a country' : currentLocation.label}</span>
            {countryisActive &&
              <div className="submenu">
                <ul className="submenu-list">
                  {onlyCountries.map((c) => (<li>
                    <button key={c.id} type="button" onClick={() => this.onChangeLocation(c.value)}>{c.label}</button>
                  </li>))}
                </ul>
              </div>}
          </li>
        </ul>
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
