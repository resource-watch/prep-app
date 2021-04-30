import { connect } from 'react-redux';
import * as actions from '../share-modal/share-modal-actions';
import ShareControl from './share-control-component';

const mapStateToProps = state => ({ open: state.shareModal.open });

export default connect(mapStateToProps, actions)(ShareControl);
