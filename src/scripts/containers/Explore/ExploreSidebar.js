import { connect } from 'react-redux';
import ExploreSidebar from '../../components/Explore/ExploreSidebar';

import { switchChange, updateURL } from '../../actions/exploremap';
import { getDatasetLayer } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.list
});
const mapDispatchToProps = (dispatch) => ({
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(getDatasetLayer(dataset));
    dispatch(updateURL());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSidebar);
