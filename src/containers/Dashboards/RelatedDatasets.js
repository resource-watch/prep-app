import { connect } from 'react-redux';
import RelatedDatasets from '../../components/Dashboards/RelatedDatasets';

import { getDatasetByIdOrSlug } from '../../actions/datasets';

const mapStateToProps = state => ({
  data: state.datasets.details,
  metadata: state.datasets.metadatas
});

const mapDispatchToProps = dispatch => ({
  getDatasetByIdOrSlug: (slug, includes) => {
    dispatch(getDatasetByIdOrSlug(slug, includes));
    // dispatch(getDatasetMetadata(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDatasets);
