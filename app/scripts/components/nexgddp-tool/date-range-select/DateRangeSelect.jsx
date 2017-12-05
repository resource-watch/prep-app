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
    this.firstHandleChange = this.firstHandleChange.bind(this);
    this.secondHandleChange = this.secondHandleChange.bind(this);
  }

  firstHandleChange(firstRangeSelected) {
    this.setState({ firstRangeSelected });
  }

  secondHandleChange(secondRangeSelected) {
    this.setState({ secondRangeSelected });
  }

  render() {
    const { dateRanges } = this.props;
    const { firstRangeSelected, secondRangeSelected } = this.state;

    return (
      <div className="c-date-range-select">
        <Select
          name="startdate"
          value={firstRangeSelected ? firstRangeSelected.value : ''}
          onChange={this.firstHandleChange}
          options={dateRanges}
        />
        <Select
          name="enddate"
          value={secondRangeSelected ? secondRangeSelected.value : ''}
          onChange={this.secondHandleChange}
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
