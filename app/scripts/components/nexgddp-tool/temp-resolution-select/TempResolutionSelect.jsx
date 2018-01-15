import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class TempResolutionSelect extends React.PureComponent {
  render() {
    const { tempResolution, setTempResolutionSelection } = this.props;

    return (
      <div className="c-temp-resolution-select">
        <Select
          id="nexgddp-temp-resolution-select"
          name="temp-resolution"
          value={tempResolution.selection}
          onChange={setTempResolutionSelection}
          options={tempResolution.options}
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

TempResolutionSelect.propTypes = {
  tempResolution: PropTypes.shape({
    options: PropTypes.arrayOf(option),
    selection: option
  }),
  setTempResolutionSelection: PropTypes.func
};

export default TempResolutionSelect;
