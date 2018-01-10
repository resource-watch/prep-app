import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map-vis';
import classnames from 'classnames';
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
    const { setMapParams, basemap, labels, boundaries, zoom, lat, lng, setBasemap,
      setLabels, setBoundaries, activeLayers, embed } = this.props;
    const currentBasemap = basemapsSpec[basemap];
    const currentLabels = labelsSpec[labels];
    const currentBoundaries = boundaries ? boundariesSpec.dark : {};

    const classNames = classnames({
      '-embed': embed
    });

    return (
      <div className={`c-explore-map ${classNames}`}>
        <Map
          mapOptions={{
            zoom,
            center: { lat, lng }
          }}
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
            collapsed={embed}
            layersSpec={activeLayers}
            position="topright"
            onSortChange={this.onSortChange}
            sortable
            onInfo={l => this.props.toggleInfo({ id: l.dataset })}
            onClose={l => this.props.toggleDataset({ id: l.dataset })}
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
  zoom: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  embed: PropTypes.bool,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setBoundaries: PropTypes.func,
  setMapParams: PropTypes.func,
  updateZIndex: PropTypes.func,
  toggleInfo: PropTypes.func,
  toggleDataset: PropTypes.func
};

export default ExploreMap;
