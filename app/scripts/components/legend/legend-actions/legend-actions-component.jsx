import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';
import './legend-actions-style.scss';

export const LegendActions = ({ onInfo, onClose }) => {
  return (
    <div className="c-legend-actions">
      {/* <button type="button" onClick={() => console.log('opacity')}><Icon name="icon-opacity" className="-normal" /></button> */}
      <button type="button" onClick={onInfo}><Icon name="icon-info" className="-normal" /></button>
      <button type="button" onClick={onClose}><Icon name="icon-cross" className="-normal" /></button>
    </div>
  );
};

LegendActions.propTypes = {
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

LegendActions.defaultProps = {
  onInfo: () => {},
  onClose: () => {}
};

export default LegendActions;
