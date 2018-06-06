import { connect } from 'react-redux';
import SimpleMap from '../../components/SimpleMap/SimpleMap';

import { getLayerById } from '../../actions/layers';

const mapStateToProps = state => ({ data: state.layers });

const mapDispatchToProps = dispatch => ({ getLayerData: (layerId) => { dispatch(getLayerById(layerId)); } });

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
