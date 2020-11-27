import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './style.scss';

class DateSelect extends React.PureComponent {
  render() {
    console.log(this.props)
    const { range1, range2, tempResolution, setRange1Selection, setRange2Selection } = this.props;

    let range1Options = [];
    if (tempResolution.selection) {
      range1Options = range1.options[tempResolution.selection.value];
    }

    let range2Options = [];
    if (tempResolution.selection) {
      range2Options = range2.options[tempResolution.selection.value];
    }

    range2Options = range2Options.map(o => ({
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

const option = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

DateSelect.propTypes = {
  range1: PropTypes.shape({
    options: PropTypes.object,
    selection: option
  }),
  range2: PropTypes.shape({
    options: PropTypes.object,
    selection: option
  }),
  setRange1Selection: PropTypes.func,
  setRange2Selection: PropTypes.func
};

export default DateSelect;
