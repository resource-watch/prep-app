import { connect } from 'react-redux';
import Explore from '../../components/Explore';

import { getDatasets } from '../../actions/datasets';

const mapStateToProps = (state, { location, params }) => ({
  data: state.datasets,
  location,
  params
});

const mapDispatchToProps = (dispatch) => ({
  getDatasets: (defaultActiveLayers) => dispatch(getDatasets(defaultActiveLayers))
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
