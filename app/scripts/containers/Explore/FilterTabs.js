import { connect } from 'react-redux';
import FilterTabs from '../../components/Explore/FilterTabs';

import { setDatasetsTagFilter } from '../../actions/datasets';
import { updateURL } from '../../actions/links';

const mapStateToProps = (state) => ({
  filtersChoosen: state.datasets.filters
});

const mapDispatchToProps = (dispatch) => ({
  setDatasetFilter: (filter, tag) => {
    dispatch(setDatasetsTagFilter(filter, tag));
    dispatch(updateURL());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTabs);
