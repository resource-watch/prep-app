import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './style.scss';

class ScenarioSelect extends React.PureComponent {
  render() {
    const { scenario, setScenarioSelection } = this.props;

    return (
      <div className="c-scenario-select">
        <Select
          name="scenario"
          id="nexgddp-scenario-select"
          value={scenario.selection}
          onChange={setScenarioSelection}
          options={scenario.options}
          clearable={false}
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

export default ScenarioSelect;
