import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './style.scss';

class DateSelect extends React.PureComponent {
  render() {
    const { range1, setRange1Selection } = this.props;
    const range1Options = range1.options;

    return (
      <div className="c-date-range-select">
        <Select
          name="startdate"
          id="nexgddp-date-range-select"
          value={range1.selection}
          onChange={setRange1Selection}
          options={range1Options}
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
  range1: { options: [] },
  setRange1Selection: null,
};

DateSelect.propTypes = {
  range1: PropTypes.shape({
    options: PropTypes.arrayOf(optionTypes),
    selection: optionTypes,
  }),
  setRange1Selection: PropTypes.func,
};

export default DateSelect;
