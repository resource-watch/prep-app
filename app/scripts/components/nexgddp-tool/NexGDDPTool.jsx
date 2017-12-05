import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScenarioSelect from './scenario-select/ScenarioSelect';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import { CompareMap, ToggleMap, DifferenceMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch';
// Redux
import { getSelectorsInfo } from 'actions/nexgddptool';

import './style.scss';

const layers = [{
  url: `${config.apiUrlRW}/layer/dd272bc7-a5e7-41e2-8ca5-6e3353603fd0/tile/rasdaman/{z}/{x}/{y}?ansi="1960-01-01T00:00:00"`,
  date: '1960-01-01T00:00:00'
}, {
  url: `${config.apiUrlRW}/layer/dd272bc7-a5e7-41e2-8ca5-6e3353603fd0/tile/rasdaman/{z}/{x}/{y}?ansi="2050-01-01T00:00:00"`,
  date: '2050-01-01T00:00:00'
}];

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
    const { isComparing } = this.props;

    return (
      <div className="c-nexgddp-tool">
        <div className="filters">
          <div className="row">
            <div className="columns small-12 medium-4">
              <DateRangeSelect />
            </div>
            <div className="columns small-12 medium-4">
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
              {mapView === 'difference' && <DifferenceMap />}
              {mapView === 'side-by-side' && <CompareMap />}
              {mapView === 'toggle' && <ToggleMap />}
            </div>
          </div>
        </div>
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
  isComparing: !!state.nexgddptool.range2.selection
});

const mapDispatchToProps = dispatch => ({
  getSelectorsInfo: () => dispatch(getSelectorsInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(NexGDDPTool);
