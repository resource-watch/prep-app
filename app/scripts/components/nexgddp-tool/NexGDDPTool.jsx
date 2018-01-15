import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScenarioSelect from './scenario-select';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import TempResolutionSelect from './temp-resolution-select';
import { CompareMap, ToggleMap, DifferenceMap, SimpleMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch';
import TimeseriesChart from './tool-chart/TimeseriesChart';

// Redux
import { getSelectorsInfo, getUrlState, setDefaultState, setMapMode, resetState, setDataset } from 'actions/nexgddptool';

// Component
import Spinner from 'components/Loading/LoadingSpinner';

import './style.scss';

class NexGDDPTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.resetState()
      .then(() => this.props.setDataset(this.props.dataset))
      .then(() => this.props.getSelectorsInfo())
      .then(() => this.props.restoreState())
      .then(() => this.props.setDefaultState())
      .then(() => this.setState({ loading: false }));
  }

  switchMapView(mapMode) {
    this.props.setMapMode(mapMode);
  }

  render() {
    const { marker, isComparing, mapMode, indicatorDataset } = this.props;
    const { loading } = this.state;

    return (
      <div className="c-nexgddp-tool">
        { loading && <Spinner inner /> }
        <div className="filters">
          <div className="row">
            <div className="columns small-12 medium-4">
              <label htmlFor="nexgddp-temp-resolution-select">Temporal resolution</label>
              <TempResolutionSelect />
            </div>
            <div className="columns small-12 medium-4">
              <label htmlFor="nexgddp-date-range-select">Date(s)</label>
              <DateRangeSelect />
            </div>
            <div className="columns small-12 medium-4">
              <label htmlFor="nexgddp-scenario-select">Scenario</label>
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
                    className={`c-button -inline ${mapMode === 'side-by-side' ? '-active' : ''}`}
                    onClick={() => this.switchMapView('side-by-side')}
                  >
                    Side by side
                  </button>

                  <button
                    className={`c-button -inline ${mapMode === 'toggle' ? '-active' : ''}`}
                    onClick={() => this.switchMapView('toggle')}
                  >
                    Toggle
                  </button>

                  <button
                    className={`c-button -inline ${mapMode === 'difference' ? '-active' : ''}`}
                    onClick={() => this.switchMapView('difference')}
                  >
                    Difference
                  </button>
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

        {marker && indicatorDataset && (
          <div className="chart">
            <div className="row">
              <div className="columns small-12">
                <TimeseriesChart />
              </div>
            </div>
          </div>
        )}
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
  mapMode: PropTypes.oneOf(['difference', 'side-by-side', 'toggle']),
  indicatorDataset: PropTypes.object,
  resetState: PropTypes.func,
  dataset: PropTypes.object.isRequired,
  setDataset: PropTypes.func
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker,
  isComparing: !!state.nexgddptool.range2.selection,
  mapMode: state.nexgddptool.mapMode,
  indicatorDataset: state.nexgddptool.indicatorDataset
});

const mapDispatchToProps = dispatch => ({
  getSelectorsInfo: () => dispatch(getSelectorsInfo()),
  restoreState: () => dispatch(getUrlState()),
  setDefaultState: () => dispatch(setDefaultState()),
  setMapMode: (...params) => dispatch(setMapMode(...params)),
  resetState: () => dispatch(resetState()),
  setDataset: (...params) => dispatch(setDataset(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(NexGDDPTool);
