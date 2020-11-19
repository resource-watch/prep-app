import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'components/ui/Icon';

// Redux
import { getSelectorsInfo, getUrlState, setDefaultState, setMapMode, resetState, setDataset } from 'actions/nexgddptool';

// Component
import Spinner from 'components/Loading/LoadingSpinner';

import ScenarioSelect from './scenario-select';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import { CompareMap, ToggleMap, SimpleMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch';
import TimeseriesChart from './tool-chart/TimeseriesChart';

import './style.scss';

class NexGDDPGeeTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount() {
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
    const {
      marker,
      isComparing,
      mapMode,
      indicatorDataset,
      render,
      embed
    } = this.props;

    const { loading } = this.state;

    return (
      <div className="c-nexgddp-gee-tool">
        {loading && <Spinner inner />}
        <div className="filters">
          <div className="row">
            <div className="columns small-12 medium-4">
              <label htmlFor="nexgddp-gee-date-range-select" id="date">Date(s)</label>
              <DateRangeSelect />
            </div>
            <div className="columns small-12 medium-4">
              <label htmlFor="nexgddp-gee-scenario-select">Scenario</label>
              <ScenarioSelect />
            </div>
          </div>
        </div>

        {(render === 'map' || !render) && (
          <div className="toolbar">
            <div className="row">
              <div className="columns small-12 medium-8">
                {isComparing && (
                  <div>
                    <button
                      aria-label="side-by-side-map"
                      type="button"
                      className={`c-button -inline ${mapMode === 'side-by-side' ? '-active' : ''}`}
                      onClick={() => this.switchMapView('side-by-side')}
                    >
                      Side by side
                    </button>

                    <button
                      aria-label="tiggle-map"
                      type="button"
                      className={`c-button -inline ${mapMode === 'toggle' ? '-active' : ''}`}
                      onClick={() => this.switchMapView('toggle')}
                    >
                      Toggle
                    </button>

                  </div>
                )}
              </div>
              <div className="columns small-12 medium-4">
                <LocationSearch />
              </div>
            </div>
          </div>
        )}

        {(render === 'map' || !render) && (
          <div className="map">
            <div className="row">
              <div className="columns small-12">
                {!isComparing &&
                  <SimpleMap embed={embed} />
                }

                {(isComparing && mapMode === 'side-by-side') &&
                  <CompareMap embed={embed} />
                }

                {(isComparing && mapMode === 'toggle') &&
                  <ToggleMap embed={embed} />
                }
              </div>
            </div>
          </div>
        )}

        {!render && !marker && (
          <div className="row">
            <div className="columns small-12">
              <div className="help-text">
                Click on the
                <span aria-label="Marker icon on the map">
                  <Icon name="icon-marker" />
                </span>
                icon or search for a place to analyze in detail.
              </div>
            </div>
          </div>
        )}

        {(render === 'chart' || !render) && marker && indicatorDataset && (
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

NexGDDPGeeTool.propTypes = {
  embed: PropTypes.bool,
  getSelectorsInfo: PropTypes.func,
  restoreState: PropTypes.func,
  setDefaultState: PropTypes.func,
  setMapMode: PropTypes.func,
  indicatorDataset: PropTypes.shape({}),
  isComparing: PropTypes.bool,
  render: PropTypes.oneOf(['map', 'chart', undefined]),
  marker: PropTypes.oneOf([null, 'error']),
  mapMode: PropTypes.oneOf(['side-by-side', 'toggle']),
  resetState: PropTypes.func,
  dataset: PropTypes.shape({}).isRequired,
  setDataset: PropTypes.func
};

NexGDDPGeeTool.defaultProps = {
  embed: false,
  getSelectorsInfo: () => { },
  restoreState: () => { },
  setDefaultState: () => { },
  setMapMode: () => { },
  indicatorDataset: {},
  isComparing: PropTypes.bool,
  render: PropTypes.oneOf(['map', 'chart', undefined]),
  marker: null,
  mapMode: PropTypes.oneOf(['side-by-side', 'toggle']),
  resetState: () => { },
  setDataset: () => { }
};

const mapStateToProps = state => ({
  open: state.shareModal.open,
  render: state.nexgddptool.render,
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

export default connect(mapStateToProps, mapDispatchToProps)(NexGDDPGeeTool);
