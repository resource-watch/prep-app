import React from 'react';
import PropTypes from 'prop-types';
import ScenarioSelect from './scenario-select/ScenarioSelect';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import { CompareMap, ToggleMap, DifferenceMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch'
import './style.scss';

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
    const scenarios = [{ label: 'High emission', value: 'high-emission' }];
    const { mapView, location } = this.state;

    return (
      <div className="c-nextgddp-tool">
        <div className="row">
          <div className="columns small-12 medium-4">
            <DateRangeSelect />
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
