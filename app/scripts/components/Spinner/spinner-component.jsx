import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './spinner-styles.scss';

class Spinner extends PureComponent {
  render() {
    const { isLoading, className, style } = this.props;
    const spinnerClasses = classnames({
      'c-spinner': true,
      '-loading': isLoading,
      [className]: !!className
    });

    return (
      <div className={spinnerClasses}>
        <div className="spinner-box" style={style}>
          <div className="icon" />
        </div>
      </div>
    );
  }
}

Spinner.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Spinner;
