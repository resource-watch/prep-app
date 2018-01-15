import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import filter from 'lodash/filter';
import { Link } from 'react-router';

import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';
import { getTitle, getMetadata, getInfo } from 'components/dataset-card/dataset-helper';

class DatasetCard extends PureComponent {
  render() {
    const { dataset, onToggleDataset, onToggleInfo } = this.props;
    const metadata = getMetadata(dataset);
    const info = getInfo(dataset);
    const title = getTitle(dataset);
    const hasLayer = !!(filter(dataset.layer, { default: true }).length);
    const classNames = [
      'c-dataset-item',
      dataset.isLayerActive ? '-layer-active' : null,
      dataset.isSelected ? '-info-active' : null
    ].join(' ');

    return (
      <div className={classNames}>
        <header className="item-header">
          <div className="header-container">
            <div className="title-container">
              {hasLayer &&
                <div className="left-element">
                  <Switch
                    onChange={() => onToggleDataset(dataset)}
                    checked={dataset.isLayerActive}
                  />
                </div>}
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
          <span className="subtitle">{metadata.source}</span>
          {dataset.env === 'preproduction' && <p style={{ fontSize: '11px', color: 'red', margin: 0 }}>preproduction</p>}
        </header>

        <div className="item-content">
          {info.function &&
            <p className="description">{truncate(info.function, { length: 75, omission: '[...]' })}</p>}
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
