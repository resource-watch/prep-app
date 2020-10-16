import { connect } from 'react-redux';
import { setScenarioSelection } from 'actions/nexgddpgeetool';
import ScenarioSelect from './ScenarioSelect';

const mapStateToProps = state => ({ scenario: state.nexgddptoolgee.scenario });

const mapDispatchToProps = dispatch => ({ setScenarioSelection: (...params) => dispatch(setScenarioSelection(...params)) });

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioSelect);
