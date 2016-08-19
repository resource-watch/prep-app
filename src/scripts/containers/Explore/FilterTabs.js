import { connect } from 'react-redux';
import ExploreMap from '../../components/Explore/ExploreMap';

import { getFilteredDatasetsByTag } from '../../actions/datasets';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick: (tagName) => {
    dispatch(getFilteredDatasetsByTag(tagName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMap);
