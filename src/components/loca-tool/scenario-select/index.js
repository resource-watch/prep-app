import { connect } from 'react-redux';
import { setScenarioSelection } from 'actions/locatool';
import ScenarioSelect from './ScenarioSelect';

const mapStateToProps = state => ({ scenario: state.locatool.scenario });

const mapDispatchToProps = dispatch => ({ setScenarioSelection: (...params) => dispatch(setScenarioSelection(...params)) });

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioSelect);
