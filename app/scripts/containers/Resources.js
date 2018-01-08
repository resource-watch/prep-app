import { connect } from 'react-redux';
import { getResources } from '../actions/resources';
import Resources from '../components/Resources';

// utils
import groupBy from 'lodash/groupBy';

const mapStateToProps = state => ({
  resources: groupBy(state.resources.list, 'resource_type')
});

const mapDispatchToProps = dispatch => ({
  getResources: params => dispatch(getResources(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
