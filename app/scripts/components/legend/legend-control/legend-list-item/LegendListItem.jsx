import React from 'react';
import PropTypes from 'prop-types';
import Legend from '../../legend-component';
import './legend-list-item.scss';

const LegendListItem = ({ value, onOpacity, onVisibility, onClose, onInfo }) => (
  <li className="c-legend-list-item">
    <Legend layerSpec={value} onOpacity={onOpacity} onVisibility={onVisibility} onInfo={onInfo} onClose={onClose} />
  </li>
);

LegendListItem.propTypes = {
  value: PropTypes.object,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

LegendListItem.defaultProps = {
  onOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {}
};

export default LegendListItem;
