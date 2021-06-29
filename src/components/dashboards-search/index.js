import { connect } from 'react-redux';
import Component from './component';
import { setSearchTerm } from 'actions/dashboards';

const mapDispatchToProps = dispatch => ({
  setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm)),
})

export default connect(null, mapDispatchToProps)(Component);
