import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ToggleHelp = ({ customText, keys }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = useCallback(() => {
    setIsEnabled(!isEnabled);
  }, [isEnabled, setIsEnabled]);

  useEffect(() => {
    const wasModalsDisabled = !!keys.find((KEY) => localStorage.getItem(KEY) === 'true');

    setIsEnabled(!wasModalsDisabled);
  }, []);

  useEffect(() => {
    if (isEnabled) {
      keys.forEach((KEY) => {
        localStorage.removeItem(KEY);
      });
    } else {
      keys.forEach((KEY) => {
        localStorage.setItem(KEY, 'true');
      });
    }
  }, [isEnabled]);

  return (
    <div className="c-card -border -border-neutral">
      <label>
        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
        &nbsp;
        {customText}
      </label>
    </div>
  );
}

ToggleHelp.defaultProps = {
  customText: 'Show tutorials and help',
  keys: [],
};

ToggleHelp.propTypes = {
  customText: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
};

export default ToggleHelp;
