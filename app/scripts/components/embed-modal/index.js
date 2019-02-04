import { connect } from 'react-redux';
import EmbedModalComponent from './embed-modal-component';

import * as actions from './embed-modal-actions';
import * as reducers from './embed-modal-reducers';

const initialState = {
  open: false,
  config: {}
};

export { initialState, actions, reducers };

const mapStateToProps = state => ({ ...state.embedModal });

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(EmbedModalComponent);
