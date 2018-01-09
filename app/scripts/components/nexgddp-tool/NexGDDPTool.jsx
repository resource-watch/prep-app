import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScenarioSelect from './scenario-select/ScenarioSelect';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import { CompareMap, ToggleMap, DifferenceMap, SimpleMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch';
import TimeseriesChart from './tool-chart/TimeseriesChart';

// Redux
import { getSelectorsInfo, getUrlState, setDefaultState, setMapMode } from 'actions/nexgddptool';

import './style.scss';

class NexGDDPTool extends React.PureComponent {
  componentDidMount() {
    this.props.getSelectorsInfo()
      .then(() => this.props.restoreState())
      .then(() => this.props.setDefaultState());
  }

  switchMapView(mapMode) {
    this.props.setMapMode(mapMode);
  }

  render() {
    const { marker, isComparing, mapMode } = this.props;

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
                    className={`c-button -inline ${mapMode === 'difference' ? '-active' : ''}`}
                    onClick={() => this.switchMapView('difference')}
                  >Difference</button>
                  <button
                    className={`c-button -inline ${mapMode === 'side-by-side' ? '-active' : ''}`}
                    onClick={() => this.switchMapView('side-by-side')}
                  >Side by side</button>
                  <button
                    className={`c-button -inline ${mapMode === 'toggle' ? '-active' : ''}`}
                    onClick={() => this.switchMapView('toggle')}
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
              {(isComparing && mapMode === 'difference') && <DifferenceMap />}
              {(isComparing && mapMode === 'side-by-side') && <CompareMap />}
              {(isComparing && mapMode === 'toggle') && <ToggleMap />}
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
  restoreState: PropTypes.func,
  setDefaultState: PropTypes.func,
  setMapMode: PropTypes.func,
  isComparing: PropTypes.bool,
  marker: PropTypes.array,
  mapMode: PropTypes.oneOf(['difference', 'side-by-side', 'toggle'])
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker,
  isComparing: !!state.nexgddptool.range2.selection,
  mapMode: state.nexgddptool.mapMode
});

const mapDispatchToProps = dispatch => ({
  getSelectorsInfo: () => dispatch(getSelectorsInfo()),
  restoreState: () => dispatch(getUrlState()),
  setDefaultState: () => dispatch(setDefaultState()),
  setMapMode: (...params) => dispatch(setMapMode(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(NexGDDPTool);
