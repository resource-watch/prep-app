import { connect } from 'react-redux';
import Component from 'components/dashboards-search/component';
import { setSearchTerm } from 'actions/insights';

const mapDispatchToProps = dispatch => ({
  setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm)),
})

export default connect(null, mapDispatchToProps)(Component);
