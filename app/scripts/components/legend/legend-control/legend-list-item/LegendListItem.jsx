import React from 'react';
import PropTypes from 'prop-types';
import Legend from '../../legend-component';
import './legend-list-item.scss';

const LegendListItem = ({ value, onClose, onInfo }) => (
  <li className="c-legend-list-item">
    <Legend layerSpec={value} onInfo={onInfo} onClose={onClose} />
  </li>
);

LegendListItem.propTypes = {
  value: PropTypes.object,
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

export default LegendListItem;
