import { connect } from 'react-redux';
import { getResources } from '../actions/resources';
import Resources from '../components/Resources';

const mapStateToProps = state => ({
  list: state.resources.list,
  // featured: state.resources.list.filter(d => d.featured)
});

const mapDispatchToProps = dispatch => ({
  getResources: () => dispatch(getResources())
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
