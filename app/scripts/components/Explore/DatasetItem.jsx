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
    this.props.onInfoClick(dataset.slug);
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
    const { dataset, layerActive } = this.props;
    // keep to not break stuff..
    const checked = dataset.active;
    if (dataset.layer && dataset.layer.length) {
      return (
        <Switch
          onChange={this.onSwitchChange}
          checked={checked}
        />
      );
    }

    return null;
  }

  getMetadata() {
    const { dataset } = this.props;
    const metadata = { title: dataset.name, subtitle: '', description: '', tags: [] };

    // Set metadata
    if ((dataset.metadata || []).length) {
      const { info } = (dataset.metadata[0] || {}).attributes;
      const { organization, short_description } = info || {};

      if (organization) metadata.subtitle = organization;
      if (short_description) metadata.description = short_description;
    }

    if ((dataset.vocabulary || []).length && dataset.vocabulary[0].attributes.tags) {
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
              <Link className="item-title-link" to={`/dataset/${this.props.dataset.slug}`} >
                <h3 className="item-title">{metadata.title}</h3>
              </Link>
            </div>
            <div className="item-tools">
              {infoButton}
            </div>
          </div>
          <span className="subtitle">{metadata.subtitle}</span>
        </header>

        <div className="item-content">
          {metadata.description && <p className="description">{metadata.description}</p>}
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
