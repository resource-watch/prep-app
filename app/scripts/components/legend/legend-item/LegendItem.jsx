import React from 'react';
import PropTypes from 'prop-types';
import './legend-item.scss';

export const LegendItem = ({ name, color, size, icon }) => {
  const getIconHtml = (iconName) => {
    if (iconName === 'triangle') {
      return (
        <div
          className={`icon-${icon}`}
          style={{
            boderRightWidth: (size / 2),
            boderLeftWidth: (size / 2),
            boderBottomWidth: size,
            borderBottomColor: color
          }}
        />
      );
    }

    if (iconName === 'line') {
      return (<div className={`icon-${icon}`} style={{ width: size, backgroundColor: color }} />);
    }

    return (
      <div
        className={`icon-${icon}`}
        style={{ width: size, height: size, backgroundColor: color }}
      />
    );
  };

  return (
    <div className="c-legend-item">
      {getIconHtml(icon)}
      <span className="name">{name}</span>
    </div>
  );
};

LegendItem.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['square', 'line', 'circle', 'triangle'])
};

LegendItem.defaultProps = {
  size: 11,
  color: '#64d1b8',
  name: 'Power',
  icon: 'square'
};

export default LegendItem;
