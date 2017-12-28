import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';

const DatasetCard = (props) => {
  const { dataset, layerIsActive, selected, onToggleLayer, onClose, onInfo } = props;
  const { metadata } = dataset;

  return (
    <div className="c-dataset-item">
      <header className="item-header">
        <div className="header-container">
          <div className="title-container">
            <div className="left-element">
              <Switch
                onChange={onToggleLayer}
                checked={layerIsActive}
              />
            </div>
            <Link className="item-title-link" to={`/dataset/${dataset.slug}`} >
              <h3 className="item-title">{metadata.title}</h3>
            </Link>
          </div>
          <div className="item-tools">
            {selected ?
              <button key={'info-close'} onClick={onClose} className="cancel">
                <Icon name="icon-cancel" />
              </button> :
              <button key={'info-open'} onClick={onInfo} className="info">
                <Icon name="icon-info" />
              </button>}
          </div>
        </div>
        <span className="subtitle">{metadata.subtitle}</span>
      </header>

      <div className="item-content">
        {metadata.description && <p className="description">{metadata.description}</p>}
      </div>
    </div>
  );
};

DatasetCard.defaultProps = {
  dataset: {},
  layerIsActive: false,
  selected: false,
  onClose: () => {},
  onInfo: () => {},
  onToggleLayer: () => {}
};

DatasetCard.propTypes = {
  dataset: PropTypes.object,
  layerIsActive: PropTypes.bool,
  selected: PropTypes.bool,
  onClose: PropTypes.func,
  onInfo: PropTypes.func,
  onToggleLayer: PropTypes.func
};

export default DatasetCard;
