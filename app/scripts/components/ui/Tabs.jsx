import React from 'react';
import PropTypes from 'prop-types';

// Libraries
import classnames from 'classnames';


export default function Tabs({ options, className, selected, onChange }) {
  const classNames = classnames(
    'c-tabs',
    { [className]: !!className }
  );

  return (
    <header className={classNames}>
      <div className="row l-row">
        {options.map((option) => {
          const btnClasses = classnames({
            '-active': option.value === selected
          });

          return (
            <div
              key={option.value}
              className="column shrink"
            >
              <button className={`tab ${btnClasses}`} onClick={onChange}>
                <span className="title">{option.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </header>
  );
}

Tabs.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.string,
  // Actions
  onChange: PropTypes.func
};
