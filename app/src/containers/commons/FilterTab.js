import { connect } from 'react-redux';
import FilterTab from '../../components/commons/FilterTab';

import { setModalUnderDevelop } from '../../actions/modal';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  click: () => dispatch(setModalUnderDevelop(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTab);
