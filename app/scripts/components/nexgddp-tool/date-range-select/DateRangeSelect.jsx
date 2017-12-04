import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.css';

class DateRangeSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstRangeSelected: '',
      secondRangeSelected: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const { dateRanges } = this.props;
    const { firstRangeSelected, secondRangeSelected } = this.state;

    return (
      <div className="c-date-range-select">
        <Select
          name="startdate"
          value={firstRangeSelected.value}
          onChange={this.handleChange}
          options={dateRanges}
        />
        <Select
          name="enddate"
          value={secondRangeSelected.value}
          onChange={this.handleChange}
          options={dateRanges}
        />
      </div>
    );
  }
}

DateRangeSelect.propTypes = {
  dateRanges: PropTypes.array
};

export default DateRangeSelect;
