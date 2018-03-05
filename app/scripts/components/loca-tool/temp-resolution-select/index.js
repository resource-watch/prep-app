import { connect } from 'react-redux';
import { setTempResolutionSelection } from 'actions/locatool';
import TempResolutionSelect from './TempResolutionSelect';

const mapStateToProps = state => ({
  tempResolution: state.locatool.tempResolution
});

const mapDispatchToProps = dispatch => ({
  setTempResolutionSelection: (...params) => dispatch(setTempResolutionSelection(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TempResolutionSelect);
