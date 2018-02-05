import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map-vis';
import classnames from 'classnames';
import BasemapControl from 'components/basemap-control';
import LegendControl from 'components/legend/legend-control';
import ShareControl from 'components/share-control';
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
    const { setMapParams, basemap, labels, boundaries, bbox, sidebar, zoom, lat, lng, minZoom, setBasemap,
      setLabels, setBoundaries, activeLayers, embed } = this.props;

    const currentBasemap = basemapsSpec[basemap];
    const currentLabels = labelsSpec[labels];
    const currentBoundaries = boundaries ? boundariesSpec.dark : {};

    const classNames = classnames({
      '-embed': embed
    });

    const { origin, search } = window.location;

    return (
      <div className={`c-explore-map ${classNames}`}>
        <Map
          mapOptions={{
            zoom,
            minZoom,
            center: { lat, lng }
          }}
          basemap={currentBasemap}
          labels={currentLabels}
          boundaries={currentBoundaries}
          layers={activeLayers}
          bbox={bbox}
          sidebar={sidebar}
          onChange={setMapParams}
        >
          <BasemapControl
            className="-absolute" // pfff....
            basemap={basemap}
            setBasemap={setBasemap}
            labels={labels}
            setLabels={setLabels}
            boundaries={boundaries}
            setBoundaries={setBoundaries}
          />

          {!embed &&

            <ShareControl
              className="-absolute" // pfff....
              open={this.props.open}
              links={{
                link: window.location.href,
                embed: `${origin}/embed/explore/${search}`
              }}
              setOpen={this.props.setOpen}
              setLinks={this.props.setLinks}
              analytics={{
                category: 'Explore data',
                action: 'Share a map'
              }}
            />
          }
        </Map>

        {!!activeLayers.length &&
          <LegendControl
            collapsed={embed}
            layersSpec={activeLayers}
            position="topright"
            onSortChange={this.onSortChange}
            sortable
            onVisibility={l => this.props.toggleVisibility({ id: l.dataset })}
            onInfo={l => this.props.toggleInfo({ id: l.dataset })}
            onOpacity={this.props.updateOpacity}
            onClose={l => this.props.toggleDataset({ id: l.dataset })}
            onMultiLayer={l => this.props.setMultiActiveLayer(l)}
            onFitBounds={(l) => {
              this.props.setBBox(l.layerConfig.bbox);

              // Reset the bounds inmediatly to have the possibility to click on it again
              requestAnimationFrame(() => {
                this.props.setBBox(null);
              });
            }}
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
  minZoom: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  embed: PropTypes.bool,
  open: PropTypes.bool,
  bbox: PropTypes.any,
  sidebar: PropTypes.object,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setBoundaries: PropTypes.func,
  setMapParams: PropTypes.func,
  updateZIndex: PropTypes.func,
  toggleInfo: PropTypes.func,
  toggleDataset: PropTypes.func,
  toggleVisibility: PropTypes.func,
  updateOpacity: PropTypes.func,
  setMultiActiveLayer: PropTypes.func,
  setBBox: PropTypes.func,
  setOpen: PropTypes.func,
  setLinks: PropTypes.func
};

export default ExploreMap;
