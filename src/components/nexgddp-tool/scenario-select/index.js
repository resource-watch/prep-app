import { connect } from 'react-redux';
import { setScenarioSelection } from 'actions/nexgddptool';
import ScenarioSelect from './ScenarioSelect';

const mapStateToProps = state => ({ scenario: state.nexgddptool.scenario });

const mapDispatchToProps = dispatch => ({ setScenarioSelection: (...params) => dispatch(setScenarioSelection(...params)) });

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioSelect);
