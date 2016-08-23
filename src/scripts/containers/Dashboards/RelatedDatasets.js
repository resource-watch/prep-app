import { connect } from 'react-redux';
import RelatedDatasets from '../../components/Dashboards/RelatedDatasets';

import { getDatasetById } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.list
});

const mapDispatchToProps = (dispatch) => ({
  getDatasetById: (slug) => {
    dispatch(getDatasetById(slug));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDatasets);
