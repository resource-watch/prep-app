import { connect } from 'react-redux';
import BasemapControl from '../../components/Explore/BasemapControl';

import { setBasemap, setLabels, setBoundaries } from '../../actions/exploremap';

const mapStateToProps = state => ({
  basemap: state.exploremap.basemap,
  labels: state.exploremap.labels,
  boundaries: state.exploremap.boundaries,
  basemapControl: state.exploremap.basemapControl
});

const mapDispatchToProps = dispatch => ({
  setBasemap: (basemap) => {
    dispatch(setBasemap(basemap));
  },
  setLabels: (label) => {
    dispatch(setLabels(label));
  },
  setBoundaries: (boundaries) => {
    dispatch(setBoundaries(boundaries));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BasemapControl);
