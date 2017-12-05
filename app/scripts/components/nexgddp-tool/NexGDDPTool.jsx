import React from 'react';
import PropTypes from 'prop-types';
import ScenarioSelect from './scenario-select/ScenarioSelect';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import { CompareMap, ToggleMap, DifferenceMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch'
import './style.scss';

const dateRanges = [{
  label: '1950 - 1960',
  value: '1950'
}, {
  label: '1960 - 1970',
  value: '1960'
}, {
  label: '1970 - 1980',
  value: '1970'
}, {
  label: '1980 - 1990',
  value: '1980'
}, {
  label: '1990 - 2000',
  value: '1990'
}];

const scenarios = [{
  label: 'RCP45',
  value: 'nex_tasavg_decadal_rcp45'
}, {
  label: 'RCP85',
  value: 'nex_tasavg_decadal_rcp85'
}];

class NexGDDPTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapView: props.mapView,
      location: null
    };
    this.onLocationFound = this.onLocationFound.bind(this);
    this.switchMapView = this.switchMapView.bind(this);
  }

  onLocationFound({ location }) {
    if (location) this.setState({ location });
  }

  switchMapView(mapView) {
    return () => this.setState({ mapView });
  }

  render() {
    const { mapView, location } = this.state;

    return (
      <div className="c-nextgddp-tool">
        <div className="row">
          <div className="columns small-12 medium-4">
            <DateRangeSelect dateRanges={dateRanges} />
          </div>
          <div className="columns small-12 medium-4">
            <ScenarioSelect scenarios={scenarios} />
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 medium-8">
            <button
              className={`c-button -inline ${mapView === 'difference' ? '-active' : ''}`}
              onClick={this.switchMapView('difference')}
            >Difference</button>
            <button
              className={`c-button -inline ${mapView === 'side-by-side' ? '-active' : ''}`}
              onClick={this.switchMapView('side-by-side')}
            >Side by side</button>
            <button
              className={`c-button -inline ${mapView === 'toggle' ? '-active' : ''}`}
              onClick={this.switchMapView('toggle')}
            >Toggle</button>
          </div>
          <div className="columns small-12 medium-4">
            <LocationSearch onChange={this.onLocationFound} />
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            {mapView === 'difference' && <DifferenceMap markerLocation={location} />}
            {mapView === 'side-by-side' && <CompareMap markerLocation={location} />}
            {mapView === 'toggle' && <ToggleMap markerLocation={location} />}
          </div>
        </div>
      </div>
    );
  }
}

NexGDDPTool.propTypes = {
  mapView: PropTypes.oneOf(['difference', 'side-by-side', 'toggle'])
};

NexGDDPTool.defaultProps = {
  mapView: 'difference'
};

export default NexGDDPTool;
