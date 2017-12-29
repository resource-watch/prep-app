import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import { Link } from 'react-router';

import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';
import { getTitle, getInfo, getMetadata } from 'components/dataset-info/dataset-info-helper';

class DatasetCard extends PureComponent {
  render () {
    const { dataset, selected, onToggleDataset, onToggleInfo } = this.props;
    const { isLayerActive } = dataset;
    const metadata = getMetadata(dataset);
    const info = getInfo(dataset);
    const title = getTitle(dataset);
    const hasLayer = !!(dataset.layer && dataset.layer.length);
    const classNames = ['c-dataset-item', dataset.isSelected ? '-info-active' : null].join(' ');

    return (
      <div className={classNames}>
        <header className="item-header">
          <div className="header-container">
            <div className="title-container">
              <div className="left-element">
                {hasLayer && <Switch
                  onChange={() => onToggleDataset(dataset)}
                  checked={dataset.isLayerActive}
                />}
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
          <span className="subtitle">{info.organization}</span>
        </header>

        <div className="item-content">
          {info['short-description'] &&
            <p className="description">{truncate(info['short-description'], { length: 75, omission: '[...]' })}</p>}
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
