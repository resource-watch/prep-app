import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScenarioSelect from './scenario-select/ScenarioSelect';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import { CompareMap, ToggleMap, DifferenceMap, SimpleMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch';
import TimeseriesChart from './tool-chart/TimeseriesChart';
// Redux
import { getSelectorsInfo } from 'actions/nexgddptool';

import './style.scss';

class NexGDDPTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapView: props.mapView
    };
    this.switchMapView = this.switchMapView.bind(this);
  }

  componentDidMount() {
    this.props.getSelectorsInfo();
  }

  switchMapView(mapView) {
    return () => this.setState({ mapView });
  }

  render() {
    const { mapView } = this.state;
    const { marker, isComparing } = this.props;

    return (
      <div className="c-nexgddp-tool">
        <div className="filters">
          <div className="row">
            <div className="columns small-12 medium-4">
              <label>Date(s)</label>
              <DateRangeSelect />
            </div>
            <div className="columns small-12 medium-4">
              <label>Scenario</label>
              <ScenarioSelect />
            </div>
          </div>
        </div>

        <div className="toolbar">
          <div className="row">
            <div className="columns small-12 medium-8">
              { isComparing && (
                <div>
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
              )}
            </div>
            <div className="columns small-12 medium-4">
              <LocationSearch />
            </div>
          </div>
        </div>

        <div className="map">
          <div className="row">
            <div className="columns small-12">
              {!isComparing && <SimpleMap />}
              {(isComparing && mapView === 'difference') && <DifferenceMap />}
              {(isComparing && mapView === 'side-by-side') && <CompareMap />}
              {(isComparing && mapView === 'toggle') && <ToggleMap />}
            </div>
          </div>
        </div>

        {marker && <div className="chart">
          <div className="row">
            <div className="columns small-12">
              <TimeseriesChart />
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

NexGDDPTool.propTypes = {
  getSelectorsInfo: PropTypes.func,
  isComparing: PropTypes.bool,
  mapView: PropTypes.oneOf(['difference', 'side-by-side', 'toggle'])
};

NexGDDPTool.defaultProps = {
  mapView: 'difference'
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker,
  isComparing: !!state.nexgddptool.range2.selection
});

const mapDispatchToProps = dispatch => ({
  getSelectorsInfo: () => dispatch(getSelectorsInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(NexGDDPTool);
