import { connect } from 'react-redux';
import DataMapLegend from '../../components/maps/DataMapLegend';

import { setModalUnderDevelop } from '../../actions/modal';

function getActiveLayers(layers) {
  if (!layers.length) {
    return [];
  }
  const activeLayers = [];
  layers.forEach((layer) => {
    if (layer.active) activeLayers.push(layer);
  });
  return activeLayers;
}

const mapStateToProps = (state) => ({
  data: getActiveLayers(state.datasets.list)
});
const mapDispatchToProps = (dispatch) => ({
  actionClick: () => dispatch(setModalUnderDevelop(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMapLegend);
