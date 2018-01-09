import React from 'react';
import PropTypes from 'prop-types';
import Legend from '../../legend-component';
import './legend-list-item.scss';

const LegendListItem = ({ value }) => (
  <li className="c-legend-list-item">
    <Legend layerSpec={value} />
  </li>
);

LegendListItem.propTypes = {
  value: PropTypes.object
};

export default LegendListItem;
