import { connect } from 'react-redux';
import * as actions from '../share-modal/share-modal-actions';
import ShareButton from './share-button-component';

const mapStateToProps = state => ({ open: state.shareModal.open });

export default connect(mapStateToProps, actions)(ShareButton);
