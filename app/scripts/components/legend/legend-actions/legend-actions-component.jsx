import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';
import './legend-actions-style.scss';

export const LegendActions = ({ layerSpec, onOpacity, onVisibility, onInfo, onClose }) => (
  <div className="c-legend-actions">
    <button
      type="button"
    >
      <Icon name="icon-opacity" className="-normal" />
    </button>
    <button
      type="button"
      className={layerSpec.visibility ? '' : '-active'}
      onClick={() => onVisibility(layerSpec)}
    >
      {layerSpec.visibility ?
        <Icon name="icon-hide" className="-normal" /> :
        <Icon name="icon-show" className="-normal" />}
    </button>
    <button
      type="button"
      className={layerSpec.isSelected ? '-active' : ''}
      onClick={() => onInfo(layerSpec)}
    >
      {layerSpec.isSelected ?
        <Icon name="icon-info" className="-normal" /> :
        <Icon name="icon-info" className="-normal" />}
    </button>
    <button
      type="button"
      onClick={() => onClose(layerSpec)}
    >
      <Icon name="icon-cross" className="-normal" />
    </button>
  </div>
);

LegendActions.propTypes = {
  layerSpec: PropTypes.object,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

LegendActions.defaultProps = {
  onOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {}
};

export default LegendActions;
