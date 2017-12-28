import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';

class DatasetCard extends PureComponent {
  render () {
    const { dataset, selected, onToggleDataset, onToggleInfo } = this.props;
    const { isLayerActive } = dataset;
    const metadata = dataset.metadata && dataset.metadata.length ? dataset.metadata[0] || {} : {};
    const info = metadata ? metadata.info || {} : {};
    const title = info.title || metadata.name || dataset.name;
    const classNames = ['c-dataset-item', dataset.isSelected ? '-info-active' : null].join(' ');

    return (
      <div className={classNames}>
        <header className="item-header">
          <div className="header-container">
            <div className="title-container">
              <div className="left-element">
                <Switch
                  onChange={() => onToggleDataset(dataset)}
                  checked={dataset.isLayerActive}
                />
              </div>
              <Link className="item-title-link" to={`/dataset/${dataset.slug}`} >
                <h3 className="item-title">{title}</h3>
              </Link>
            </div>
            <div className="item-tools">
              {dataset.isSelected ?
                <button key={'info-close'} onClick={() => onToggleInfo(dataset)} className="cancel">
                  <Icon name="icon-cancel" />
                </button> :
                <button key={'info-open'} onClick={() => onToggleInfo(dataset)} className="info">
                  <Icon name="icon-info" />
                </button>}
            </div>
          </div>
          <span className="subtitle">{info.subtitle}</span>
        </header>

        <div className="item-content">
          {info['short-description'] && <p className="description">{info['short-description']}</p>}
        </div>
      </div>
    );
  }
}

DatasetCard.defaultProps = {
  dataset: {},
  onToggleInfo: () => {},
  onToggleDataset: () => {}
};

DatasetCard.propTypes = {
  dataset: PropTypes.object,
  onToggleInfo: PropTypes.func,
  onToggleDataset: PropTypes.func
};

export default DatasetCard;
