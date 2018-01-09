import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map-vis';
import BasemapControl from 'components/basemap-control';
import LegendControl from 'components/legend/legend-control';
import { basemapsSpec, labelsSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';

class ExploreMap extends PureComponent {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
  }

  onSortChange(layers) {
    this.props.updateZIndex(layers);
  }

  render() {
    const { setMapParams, basemap, labels, boundaries, setBasemap,
      setLabels, setBoundaries, activeLayers } = this.props;
    const currentBasemap = basemapsSpec[basemap];
    const currentLabels = labelsSpec[labels];
    const currentBoundaries = boundaries ? boundariesSpec.dark : {};

    return (
      <div className="c-explore-map">
        <Map
          basemap={currentBasemap}
          labels={currentLabels}
          boundaries={currentBoundaries}
          layers={activeLayers}
          onChange={setMapParams}
        >
          <BasemapControl
            basemap={basemap}
            setBasemap={setBasemap}
            labels={labels}
            setLabels={setLabels}
            boundaries={boundaries}
            setBoundaries={setBoundaries}
          />
        </Map>
        {activeLayers.length &&
          <LegendControl
            layersSpec={activeLayers}
            position="topright"
            onSortChange={this.onSortChange}
            sortable
          />}
      </div>
    );
  }
}

ExploreMap.defaultProps = {
  activeLayers: []
};

ExploreMap.propTypes = {
  basemap: PropTypes.oneOf(['default', 'dark', 'light', 'satellite', 'terrain']),
  labels: PropTypes.oneOf(['none', 'dark', 'light']),
  activeLayers: PropTypes.array,
  boundaries: PropTypes.bool,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setBoundaries: PropTypes.func,
  setMapParams: PropTypes.func,
  updateZIndex: PropTypes.func
};

export default ExploreMap;
