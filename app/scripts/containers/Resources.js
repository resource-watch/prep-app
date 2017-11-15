import { connect } from 'react-redux';
import { getResources } from '../actions/resources';
import Resources from '../components/Resources';
import { firstTypeSelector, secondTypeSelector, thirdTypeSelector } from '../selectors/resources.selector';

const mapStateToProps = state => ({
  list: firstTypeSelector(state),
  secondList: secondTypeSelector(state),
  thirdList: thirdTypeSelector(state)
});

const mapDispatchToProps = dispatch => ({
  getResources: params => dispatch(getResources(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
