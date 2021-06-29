import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './style.scss';

class DateSelect extends React.PureComponent {
  render() {
    const { range1, range2, setRange1Selection, setRange2Selection } = this.props;

    const range1Options = range1.options;
    const range2Options = range1.options.map(o => ({
      ...o,
      isDisabled: range1.selection && o.value === range1.selection.value
    }));

    return (
      <div className="c-date-range-select">
        <Select
          name="startdate"
          id="nexgddp-date-range-select"
          value={range1.selection}
          onChange={setRange1Selection}
          options={range1Options}
        />
        <Select
          name="enddate"
          value={range2.selection}
          onChange={setRange2Selection}
          options={range2Options}
          isClearable
        />
      </div>
    );
  }
}

const optionTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

DateSelect.defaultProps = {
  range1: null,
  range2: null,
  setRange1Selection: null,
  setRange2Selection: null,
};

DateSelect.propTypes = {
  range1: PropTypes.shape({
    options: PropTypes.arrayOf(optionTypes),
    selection: optionTypes
  }),
  range2: PropTypes.shape({
    options: PropTypes.arrayOf(optionTypes),
    selection: optionTypes
  }),
  setRange1Selection: PropTypes.func,
  setRange2Selection: PropTypes.func
};

export default DateSelect;
