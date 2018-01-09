import React from 'react';
import PropTypes from 'prop-types';
// import styles from './legend-gradient.scss';

export const LegendGradient = ({ legendSpec }) => {
  const gradient = legendSpec.items.map(item => item.color);

  return (
    <div className="c-legend-gradient">
      <div className="icon-gradient" style={{ backgroundImage: `linear-gradient(to right, ${gradient.join(',')})` }} />
      <ul>
        {legendSpec.items.map(({ name, color, value }) => (
          <li key={`legend-gradient-item-${color}-${value}`}>
            <span className="name">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

LegendGradient.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default LegendGradient;
