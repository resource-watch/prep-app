import { connect } from 'react-redux';
import BasemapControl from '../../components/Explore/BasemapControl';

import { setBasemap, setLabels } from '../../actions/exploremap';

const mapStateToProps = state => ({
  basemap: state.exploremap.basemap,
  basemapControl: state.exploremap.basemapControl
});

const mapDispatchToProps = dispatch => ({
  setBasemap: (basemap) => {
    dispatch(setBasemap(basemap));
  },
  setLabels: (label) => {
    dispatch(setLabels(label));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BasemapControl);
