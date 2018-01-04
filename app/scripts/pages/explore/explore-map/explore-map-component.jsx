import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import BasemapControl from 'components/basemap-control';

class ExploreMap extends PureComponent {
  render() {
    const { setMapParams, basemap, labels, boundaries, setBasemap, setLabels, setBoundaries } = this.props;
    return (
      <div className="c-explore-map">
        <Map onChange={setMapParams}>
          <BasemapControl
            basemap={basemap}
            setBasemap={setBasemap}
            labels={labels}
            setLabels={setLabels}
            boundaries={boundaries}
            setBoundaries={setBoundaries}
          />
        </Map>
      </div>
    );
  }
}

ExploreMap.propTypes = {
  basemap: PropTypes.oneOf(['default', 'dark', 'light', 'satellite', 'terrain']),
  labels: PropTypes.oneOf(['none', 'dark', 'light']),
  boundaries: PropTypes.bool,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setBoundaries: PropTypes.func,
  setMapParams: PropTypes.func
};

export default ExploreMap;
