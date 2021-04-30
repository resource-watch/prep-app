import { connect } from 'react-redux';
import Component from 'components/popup';
import { setModal } from 'components/embed-modal/embed-modal-actions';
import initialState from './initial-state';
import * as reducers from './reducers';
import { getInteraction } from './selector';


export { initialState, reducers };
export default connect(
  state => ({
    interaction: getInteraction(state)
  }),
  { setModal }
)(Component);
