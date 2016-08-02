import React from 'react';

function LoadingSpinner(props) {
  const classNames = ['c-loading-spinner'];
  if (props.transparent) classNames.push('-transparent');

  return (
    <div className={classNames.join(' ')}>
      <svg>
        <circle
          cx="30"
          cy="30"
          r="20"
          fill="none"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}

LoadingSpinner.propTypes = {
  // Set the loading background transparent
  transparent: React.PropTypes.bool
};

export default LoadingSpinner;
