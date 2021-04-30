import 'whatwg-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { browserHistory } from 'react-router';
import './style.scss';

class ScenarioSelect extends React.PureComponent {
  handleScenario = (currentScenario) => {
    const { additionalData, dataset, setScenarioSelection } = this.props;
    const isAbsolute = additionalData.absolute.low.id === dataset.id || additionalData.absolute.high.id === dataset.id;
    const { slug } = additionalData[isAbsolute ? 'absolute' : 'change'][currentScenario.value === 'low' ? 'high' : 'low'];

    setScenarioSelection(currentScenario);
    browserHistory.push(`/dataset/${slug}${window.location.search}`);
  }

  render() {
    const { scenario } = this.props;

    return (
      <div className="c-scenario-select">
        <Select
          name="scenario"
          id="nexgddp-scenario-select"
          value={scenario.selection}
          onChange={this.handleScenario}
          options={scenario.options}
          clearable={false}
        />
      </div>
    );
  }
}

const optionTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

ScenarioSelect.defaultProps = {
  additionalData: null,
  dataset: null,
  scenario: null,
};

ScenarioSelect.propTypes = {
  additionalData: PropTypes.shape({}),
  dataset: PropTypes.shape({}),
  scenario: PropTypes.shape({
    options: PropTypes.arrayOf(optionTypes),
    selection: optionTypes,
  }),
  setScenarioSelection: PropTypes.func.isRequired,
};

export default ScenarioSelect;
