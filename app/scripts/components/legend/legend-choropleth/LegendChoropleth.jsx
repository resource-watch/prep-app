import React from 'react';
import PropTypes from 'prop-types';
import './legend-choropleth.scss';

export const LegendChoropleth = ({ legendSpec }) => (
  <ul className="c-legend-choropleth">
    {legendSpec.items.map(({ name, color }) => (
      <li key={`legend-choropleth-item-${name}`}>
        <div className="icon-choropleth" style={{ backgroundColor: color }} />
        <span className="name">{name}</span>
      </li>
    ))}
  </ul>
);

LegendChoropleth.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default LegendChoropleth;
