import { connect } from 'react-redux';
import FilterTabs from '../../components/Explore/FilterTabs';

import { setDatasetsTagFilter } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  filterSelected: state.datasets.filters.tag
});

const mapDispatchToProps = (dispatch) => ({
  setDatasetFilter: (tagName) => {
    dispatch(setDatasetsTagFilter(tagName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTabs);
