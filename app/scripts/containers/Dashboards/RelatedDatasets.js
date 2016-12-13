import { connect } from 'react-redux';
import RelatedDatasets from '../../components/Dashboards/RelatedDatasets';

import { getDatasetById } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.details,
  metadata: state.datasets.metadatas
});

const mapDispatchToProps = (dispatch) => ({
  getDatasetById: (id, includes) => {
    dispatch(getDatasetById(id, includes));
    // dispatch(getDatasetMetadata(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDatasets);
