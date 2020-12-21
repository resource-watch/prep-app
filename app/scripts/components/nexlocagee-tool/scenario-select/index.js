import { connect } from 'react-redux';
import { setScenarioSelection } from 'actions/nexlocageetool';
import ScenarioSelect from './ScenarioSelect';

const mapStateToProps = state => ({
  additionalData: state.datasetPage.additionalData,
  dataset: state.nexlocageetool.dataset,
  scenario: state.nexlocageetool.scenario,
});

const mapDispatchToProps = dispatch => ({ setScenarioSelection: (...params) => dispatch(setScenarioSelection(...params)) });

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioSelect);
