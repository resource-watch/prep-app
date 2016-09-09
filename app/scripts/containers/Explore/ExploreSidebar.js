import { connect } from 'react-redux';
import ExploreSidebar from '../../components/Explore/ExploreSidebar';

import { switchChange } from '../../actions/exploremap';
import { updateURL } from '../../actions/links';
import { getDatasetLayer } from '../../actions/datasets';
import { setTooltip } from '../../actions/tooltip';

const mapStateToProps = (state) => ({
  data: state.datasets.list,
  filters: state.datasets.filters,
  tooltip: state.tooltip
});
const mapDispatchToProps = (dispatch) => ({
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(getDatasetLayer(dataset));
    dispatch(updateURL());
  },
  setTooltip: (tooltip) => {
    dispatch(setTooltip(tooltip));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSidebar);
