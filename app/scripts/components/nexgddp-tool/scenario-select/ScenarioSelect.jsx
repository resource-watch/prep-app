import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.css';

// Redux
import actions from '../nexgddptool-actions';

class ScenarioSelect extends React.PureComponent {
  render() {
    const { scenario, setScenarioSelection } = this.props;

    return (
      <div className="c-scenario-select">
        <Select
          name="scenario"
          value={scenario.selection}
          onChange={setScenarioSelection}
          options={scenario.options}
        />
      </div>
    );
  }
}

const option = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

ScenarioSelect.propTypes = {
  scenario: PropTypes.shape({
    options: PropTypes.arrayOf(option),
    selection: option
  }),
  setScenarioSelection: PropTypes.func
};

const mapStateToProps = state => ({
  scenario: state.nexgddptool.scenario
});

export default connect(mapStateToProps, actions)(ScenarioSelect);
