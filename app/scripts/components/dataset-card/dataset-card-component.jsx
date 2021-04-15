import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import truncate from 'lodash/truncate';
import { Link } from 'react-router';

import { logEvent } from 'helpers/analytics';

import Icon from 'components/ui/Icon';
import Switch from 'components/Button/Switch';
import { getTitle, getMetadata, getInfo } from 'components/dataset-card/dataset-helper';

class DatasetCard extends PureComponent {
  /**
   * Event handler executed when the user toggles
   * on or off a dataset
   * @param {object} dataset Dataset
   */
  onToggleDataset(dataset) {
    this.props.onToggleDataset(dataset);

    if (!dataset.isLayerActive) {
      logEvent('Explore data', 'Toggles on a layer', getTitle(dataset));
    }
  }

  /**
   * Event handler executed when the user toggles the
   * info sidebar of a dataset
   * @param {object} dataset Dataset
   */
  onToggleInfo(dataset) {
    this.props.onToggleInfo(dataset);

    if (!dataset.isSelected) {
      logEvent('Explore menu', 'Click for more info', getTitle(dataset));
    }
  }

  render() {
    const { dataset, embed } = this.props;
    const metadata = getMetadata(dataset);
    const info = getInfo(dataset);
    const title = getTitle(dataset);
    const hasLayer = !!(filter(dataset.layer, { default: true }).length);
    const classNames = [
      'c-dataset-item',
      dataset.isLayerActive ? '-layer-active' : null,
      dataset.isSelected ? '-info-active' : null
    ].join(' ');

    const widgets = dataset.widget ? dataset.widget.filter(w => w.default) : [];
    const hasWidget = widgets.length > 0;

    return (
      <div className={classNames}>
        <header className="item-header">
          <div className="header-container">
            <div className="title-container">
              {hasLayer && (
                <div className="left-element">
                  <Switch
                    onChange={() => this.onToggleDataset(dataset)}
                    checked={dataset.isLayerActive}
                  />
                </div>
              )}
              <h3 className="item-title">
                { embed && (
                  <a className="item-title-link" href={`/dataset/${dataset.slug}`} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                )}
                { !embed && (
                  <Link className="item-title-link" to={`/dataset/${dataset.slug}`}>
                    {title}
                  </Link>
                )}
              </h3>
            </div>
            <div className="item-tools">
              {dataset.isSelected ?
                <button key="info-close" onClick={() => this.onToggleInfo(dataset)} className="cancel">
                  <Icon name="icon-cancel" />
                </button> :
                <button key="info-open" onClick={() => this.onToggleInfo(dataset)} className="info">
                  <Icon name="icon-info" />
                </button>}
            </div>
          </div>
          <span className="subtitle">{metadata.source}</span>
          {dataset.env === 'preproduction' && <p style={{ fontSize: '11px', color: 'red', margin: 0 }}>preproduction</p>}
        </header>

        <div className="item-content">
          {info.function && (
            <p className="description">{truncate(info.function, { length: 75, separator: ' ', omission: '...' })}</p>
          )}
          {hasWidget && (
            <div className="item-content-visualization">
              <Link to={`/dataset/${dataset.slug}`} className="c-new-button -light -mini">Visualization</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

DatasetCard.defaultProps = {
  dataset: {},
  onToggleInfo: () => {},
  onToggleDataset: () => {},
  embed: false
};

DatasetCard.propTypes = {
  dataset: PropTypes.object,
  embed: PropTypes.bool,
  onToggleInfo: PropTypes.func,
  onToggleDataset: PropTypes.func
};

export default DatasetCard;
