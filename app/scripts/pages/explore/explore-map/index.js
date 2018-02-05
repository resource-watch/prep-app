import { connect } from 'react-redux';
import * as shareModalActions from 'components/share-modal/share-modal-actions';

import * as exploreActions from '../explore-actions';
import * as reducers from './explore-map-reducers';
import initialState from './explore-map-initial-state';
import { getActiveLayers } from './explore-map-selector';

import Component from './explore-map-component';

const mapStateToProps = state => ({
  activeLayers: getActiveLayers(state),
  lat: state.explorePage.map.lat,
  lng: state.explorePage.map.lng,
  zoom: state.explorePage.map.zoom,
  minZoom: state.explorePage.map.minZoom,
  basemap: state.explorePage.map.basemap,
  labels: state.explorePage.map.labels,
  boundaries: state.explorePage.map.boundaries,
  bbox: state.explorePage.map.bbox,
  open: state.shareModal.open
});

export { reducers, initialState };

export default connect(
  mapStateToProps,
  {
    ...exploreActions,
    ...shareModalActions
  }
)(Component);
