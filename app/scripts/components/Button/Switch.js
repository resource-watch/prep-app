import React from 'react';
import PropTypes from 'prop-types';

function Switch(props) {
  const classNames = ['c-switch'];
  if (props.checked) classNames.push('-checked');
  return (
    <span className={classNames.join(' ')} onClick={() => props.onChange()} />
  );
}

Switch.propTypes = {
  /**
  * Define the component "state"
  */
  checked: PropTypes.bool,
  /**
  * Define the function to handle the changes
  */
  onChange: PropTypes.func.isRequired
};

export default Switch;
