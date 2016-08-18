import React from 'react';

function Switch(props) {
  const classNames = ['c-switch'];
  if (props.checked) classNames.push('-checked');
  return (
    <span className={classNames.join(' ')} onClick={() => props.onChange()} >
    </span>
  );
}

Switch.propTypes = {
  /**
  * Define the component "state"
  */
  checked: React.PropTypes.bool,
  /**
  * Define the function to handle the changes
  */
  onChange: React.PropTypes.func.isRequired
};

export default Switch;
