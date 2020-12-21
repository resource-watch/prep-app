/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';
import Spinner from 'components/Loading/LoadingSpinner';
import ScenarioSelect from './scenario-select';
import DateSelect from './date-select';
import DateRangeSelect from './date-range-select';
import { CompareMap, ToggleMap, DifferenceMap, SimpleMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch';
import TimeseriesChart from './tool-chart/TimeseriesChart';

import './style.scss';

class NexLocaGeeTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount() {
    const {
      dataset,
      resetState,
      setDataset,
      getSelectorsInfo,
      restoreState,
      setDefaultState,
    } = this.props;

    resetState()
      .then(() => setDataset(dataset))
      .then(() => getSelectorsInfo())
      .then(() => restoreState())
      .then(() => setDefaultState())
      .then(() => this.setState({ loading: false }));
  }

  componentDidUpdate() {
    const { marker, getChartData } = this.props;
    if (marker && marker.length) {
      getChartData();
    }
  }

  switchMapView(mapMode) {
    const { setMapMode } = this.props;
    setMapMode(mapMode);
  }

  render() {
    const {
      marker,
      isComparing,
      mapMode,
      render,
      embed
    } = this.props;

    const { loading } = this.state;

    return (
      <div className="c-nexgddp-tool">
        { loading && <Spinner inner /> }
        <div className="filters">
          <div className="row">
            {mapMode !== 'difference' && (
              <div className="columns small-12 medium-4">
                <label htmlFor="nexgddp-date-range-select">
                  Date(s)
                </label>
                <DateRangeSelect label="Date(s)" />
              </div>
            )}
            {mapMode === 'difference' && (
              <div className="columns small-12 medium-4">
                <label htmlFor="nexgddp-date-select">
                  Date
                </label>
                <DateSelect />
              </div>
            )}
            <div className="columns small-12 medium-4">
              <label htmlFor="nexgddp-scenario-select">
                Scenario
              </label>
              <ScenarioSelect />
            </div>
          </div>
        </div>

        {(render === 'map' || !render) && (
          <div className="toolbar">
            <div className="row">
              <div className="columns small-12 medium-8">
                { isComparing && (
                  <div>
                    <button
                      type="button"
                      className={`c-button -inline ${mapMode === 'side-by-side' ? '-active' : ''}`}
                      onClick={() => this.switchMapView('side-by-side')}
                    >
                      Side by side
                    </button>

                    <button
                      type="button"
                      className={`c-button -inline ${mapMode === 'toggle' ? '-active' : ''}`}
                      onClick={() => this.switchMapView('toggle')}
                    >
                      Toggle
                    </button>

                    <button
                      type="button"
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
        )}

        {(render === 'map' || !render) && (
          <div className="map">
            <div className="row">
              <div className="columns small-12">
                {!isComparing && (
                  <SimpleMap embed={embed} />
                )}

                {(isComparing && mapMode === 'difference') && (
                  <DifferenceMap embed={embed} />
                )}

                {(isComparing && mapMode === 'side-by-side') && (
                  <CompareMap embed={embed} />
                )}

                {(isComparing && mapMode === 'toggle') && (
                  <ToggleMap embed={embed} />
                )}
              </div>
            </div>
          </div>
        )}

        {!render && !marker && (
          <div className="row">
            <div className="columns small-12">
              <div className="help-text">
                {`Click on the `}
                <span aria-label="Marker icon on the map">
                  <Icon name="icon-marker" />
                </span>
                {` icon or search for a place to analyze in detail.`}
              </div>
            </div>
          </div>
        )}

        {(render === 'chart' || !render) && !!marker.length && (
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

NexLocaGeeTool.defaultProps = {
  embed: false,
  isComparing: false,
  render: null,
  marker: [],
  mapMode: 'side-by-side',
};

NexLocaGeeTool.propTypes = {
  embed: PropTypes.bool,
  getSelectorsInfo: PropTypes.func.isRequired,
  restoreState: PropTypes.func.isRequired,
  setDefaultState: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired,
  isComparing: PropTypes.bool,
  render: PropTypes.oneOf(['map', 'chart', undefined]),
  marker: PropTypes.array,
  mapMode: PropTypes.oneOf(['difference', 'side-by-side', 'toggle']),
  resetState: PropTypes.func.isRequired,
  dataset: PropTypes.object.isRequired,
  setDataset: PropTypes.func.isRequired,
  getChartData: PropTypes.func.isRequired,
};

export default NexLocaGeeTool;
