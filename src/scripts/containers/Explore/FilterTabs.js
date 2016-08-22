import { connect } from 'react-redux';
import FilterTabs from '../../components/Explore/FilterTabs';

import { setDatasetsTagFilter } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  filtersChoosen: state.datasets.filters
});

const mapDispatchToProps = (dispatch) => ({
  setDatasetFilter: (filter, tag) => {
    dispatch(setDatasetsTagFilter(filter, tag));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTabs);
