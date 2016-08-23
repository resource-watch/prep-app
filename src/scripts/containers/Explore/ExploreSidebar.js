import { connect } from 'react-redux';
import ExploreSidebar from '../../components/Explore/ExploreSidebar';

import { switchChange } from '../../actions/exploremap';
import { updateURL } from '../../actions/links';
import { getDatasetLayer } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.list,
  filters: state.datasets.filters
});
const mapDispatchToProps = (dispatch) => ({
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(getDatasetLayer(dataset));
    dispatch(updateURL());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSidebar);
