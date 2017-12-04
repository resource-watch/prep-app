import React from 'react';
import PropTypes from 'prop-types';
import ScenarioSelect from './scenario-select/ScenarioSelect';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import DifferenceMap from './map/DifferenceMap';
import CompareMap from './map/CompareMap';
import ToggleMap from './map/ToggleMap';

class NexGDDPTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapView: props.mapView
    };
    this.switchMapView = this.switchMapView.bind(this);
  }

  switchMapView(mapView) {
    return () => this.setState({ mapView });
  }

  render() {
    const scenarios = [{ label: 'High emission', value: 'high-emission' }];
    const { mapView } = this.state;

    return (
      <div>
        <div className="row">
          <div className="columns small-4">
            <DateRangeSelect />
          </div>
          <div className="columns small-4">
            <ScenarioSelect scenarios={scenarios} />
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <button className="c-button" onClick={this.switchMapView('difference')}>Difference</button>
            <button className="c-button" onClick={this.switchMapView('side-by-side')}>Side by side</button>
            <button className="c-button" onClick={this.switchMapView('toggle')}>Toggle</button>
            <input type="search" />
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            {mapView === 'difference' && <DifferenceMap />}
            {mapView === 'side-by-side' && <CompareMap />}
            {mapView === 'toggle' && <ToggleMap />}
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
