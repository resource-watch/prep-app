import { connect } from 'react-redux';
import ShareModalComponent from './share-modal-component';

import * as actions from './share-modal-actions';
import * as reducers from './share-modal-reducers';

const initialState = {
  open: false,
  tabs: ['link', 'embed'],
  links: {
    link: '',
    embed: ''
  },
  tab: 'link',
  /** @type {{ category: string, action: string }} analytics */
  analytics: null
};

export { initialState, actions, reducers };

const mapStateToProps = state => ({
  ...state.shareModal
});

const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareModalComponent);
