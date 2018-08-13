import { connect } from 'react-redux';
import Component from 'components/popup';
import initialState from './initial-state';
import * as reducers from './reducers';
import { getInteraction } from './selector';

const mapStateToProps = state => ({
  interaction: getInteraction(state)
});

export { initialState, reducers };
export default connect(mapStateToProps)(Component);
