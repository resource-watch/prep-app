import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Libraries
import classnames from 'classnames';

// Components
import Icon from 'components/ui/Icon';
import Switch from '../Button/Switch';


class DatasetItem extends React.Component {
  constructor() {
    super();

    this.onInfoClick = this.onInfoClick.bind(this);
    this.onCloseInfo = this.onCloseInfo.bind(this);
    this.onSwitchChange = this.onSwitchChange.bind(this);
  }

  onSwitchChange() {
    const { dataset } = this.props;
    this.props.onSwitchChange(dataset);
  }

  onCloseInfo() {
    this.props.onCloseInfo();
  }

  onInfoClick() {
    const { dataset } = this.props;
    this.props.onInfoClick(dataset.id);
  }

  getInfoButton() {
    const { infoActive } = this.props;

    return infoActive ?
      (<button key={'info-close'} onClick={this.onCloseInfo} className="cancel">
        <Icon name="icon-cancel" />
      </button>) :
      (<button key={'info-open'} onClick={this.onInfoClick} className="info">
        <Icon name="icon-info" />
      </button>);
  }

  getDatasetSwitch() {
    const { dataset } = this.props;
    if (dataset.layer && dataset.layer.length) {
      return (
        <Switch
          onChange={this.onSwitchChange}
          checked={dataset.active || false}
        />
      );
    }

    return null;
  }

  getMetadata() {
    const { dataset } = this.props;
    const metadata = { title: '', subtitle: '', description: '', tags: [] };
    metadata.title = dataset.layer && dataset.layer.length ?
      dataset.layer[0].attributes.name : dataset.name;
    // Set metadata
    if (dataset.metadata && dataset.metadata.length) {
      const MAX_LENGTH = 150;
      const info = dataset.metadata[0].attributes.info;

      if (info && info.organization) metadata.subtitle = info.organization;
      if (info && info.short_description) {
        if (info.short_description.length > MAX_LENGTH) {
          metadata.description = `${info.short_description.slice(0, MAX_LENGTH)}...`;
        } else {
          metadata.description = info.short_description;
        }
      }
    }

    if (dataset.vocabulary && dataset.vocabulary.length && dataset.vocabulary[0].attributes.tags) {
      metadata.tags = dataset.vocabulary[0].attributes.tags;
    }

    return metadata;
  }

  render() {
    const { classNames, layerActive, infoActive } = this.props;
    const className = classnames(
      'c-dataset-item',
      {
        [classNames]: !!classNames,
        '-layer-active': layerActive,
        '-info-active': infoActive
      }
    );

    const infoButton = this.getInfoButton();
    const datasetSwitch = this.getDatasetSwitch();
    const metadata = this.getMetadata();

    return (
      <div className={className}>
        <header className="item-header">
          <div className="header-container">
            <div className="title-container">
              <div className="left-element">
                {datasetSwitch}
              </div>
              <Link className="item-title-link" to={`/dataset/${this.props.dataset.id}`} >
                <h1 className="item-title">{metadata.title}</h1>
              </Link>
            </div>
            <div className="item-tools">
              {infoButton}
            </div>
          </div>
          <h2 className="subtitle">{metadata.subtitle}</h2>
        </header>


        <div className="item-content">
          {metadata.description && <p className="description">{metadata.description}</p>}
          {metadata.tags &&
            <div className="tags-container">
              {metadata.tags.map((t, i) => (
                <span key={i} className="c-tag tag">{t}</span>
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
}

DatasetItem.propTypes = {
  classNames: PropTypes.string,
  dataset: PropTypes.object,
  layerActive: PropTypes.bool,
  infoActive: PropTypes.bool,
  // Actions
  onInfoClick: PropTypes.func,
  onCloseInfo: PropTypes.func,
  onSwitchChange: PropTypes.func
};

DatasetItem.defaultProps = {
  metadata: {}
};

export default DatasetItem;
