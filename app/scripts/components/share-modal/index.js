import { connect } from 'react-redux';
import ShareModalComponent from './share-modal-component';

import * as actions from './share-modal-actions';
import * as reducers from './share-modal-reducers';

const initialState = {
  open: false,
  links: {
    linkUrl: '',
    embedUrl: ''
  },
  activeTab: ''
};

export { initialState, actions, reducers };

const mapStateToProps = state => ({ open: state.shareModal.open });

export default connect(mapStateToProps, {})(ShareModalComponent);
