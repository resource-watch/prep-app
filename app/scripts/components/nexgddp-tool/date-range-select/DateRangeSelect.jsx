import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.scss';

// Redux
import { setRange1Selection, setRange2Selection } from 'actions/nexgddptool';

class DateRangeSelect extends React.PureComponent {
  render() {
    // eslint-disable-next-line no-shadow
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
      disabled: range1.selection && o.value === range1.selection.value
    }));

    return (
      <div className="c-date-range-select">
        <Select
          name="startdate"
          id="nexgddp-date-range-select"
          value={range1.selection}
          onChange={setRange1Selection}
          options={range1Options}
          clearable={false}
        />
        <Select
          name="enddate"
          value={range2.selection}
          onChange={setRange2Selection}
          options={range2Options}
        />
      </div>
    );
  }
}

const option = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

DateRangeSelect.propTypes = {
  range1: PropTypes.shape({
    options: PropTypes.object,
    selection: option
  }),
  range2: PropTypes.shape({
    options: PropTypes.object,
    selection: option
  }),
  tempResolution: PropTypes.shape({
    options: PropTypes.arrayOf(option),
    selection: option
  }),
  setRange1Selection: PropTypes.func,
  setRange2Selection: PropTypes.func
};

const mapStateToProps = state => ({
  range1: state.nexgddptool.range1,
  range2: state.nexgddptool.range2,
  tempResolution: state.nexgddptool.tempResolution
});

const mapDispatchToProps = dispatch => ({
  setRange1Selection: (...params) => dispatch(setRange1Selection(...params)),
  setRange2Selection: (...params) => dispatch(setRange2Selection(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeSelect);
