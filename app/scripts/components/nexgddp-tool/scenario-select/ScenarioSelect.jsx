import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.css';

class ScenarioSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const { scenarios } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className="c-scenario-select">
        <Select
          name="scenario"
          value={selectedOption ? selectedOption.value : ''}
          onChange={this.handleChange}
          options={scenarios}
        />
      </div>
    );
  }
}

ScenarioSelect.propTypes = {
  scenarios: PropTypes.array
};

export default ScenarioSelect;
