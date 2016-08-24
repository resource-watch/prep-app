import { connect } from 'react-redux';
import RelatedDatasets from '../../components/Dashboards/RelatedDatasets';

import { getDatasetById, getDatasetMetadata } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.details,
  metadata: state.datasets.metadatas
});

const mapDispatchToProps = (dispatch) => ({
  getDatasetById: (id) => {
    dispatch(getDatasetById(id));
    dispatch(getDatasetMetadata(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDatasets);
