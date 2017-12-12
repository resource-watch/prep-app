

import React from 'react';
import PropTypes from 'prop-types';

// Libraries
import isEmpty from 'lodash/isEmpty';
import ReactMarkdown from 'react-markdown';

// Components
import { Link } from 'react-router';
import VegaChart from '../Chart/VegaChart';
import SimpleMap from '../../containers/Map/SimpleMap';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Icon from '../ui/Icon';
import Switch from '../Button/Switch';

// Constants
import filtersConfig from '../../../scripts/filters.json';


class InfoSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      sidebarOpen: true
    };
  }

  getHeader() {
    const { metadata, details } = this.props;
    const dataset = details[metadata.datasetSlug];
    let name = '';

    if (dataset) {
      name = dataset && dataset.metadata && dataset.metadata.length && dataset.metadata[0].attributes.technical_title ?
        dataset.metadata[0].attributes.name : dataset.name;
    }

    return dataset ?
      <header className="header-container">
        <h1 className="item-title">{name}</h1>
        {dataset.subtitle && <h2 className="item-subtitle">{dataset.subtitle}</h2>}
      </header> :
      <header className="header-container" />;
  }

  getContent() {
    const { metadata, details } = this.props;
    const dataset = details[metadata.datasetSlug] || {};
    const allFilters = filtersConfig.filters;
    const topicsList = dataset.vocabulary && dataset.vocabulary.length ?
      dataset.vocabulary[0].attributes.tags.filter(t => allFilters.topics[t]).map(t => allFilters.topics[t]) : [];
    const areasList = dataset.vocabulary && dataset.vocabulary.length ?
      dataset.vocabulary[0].attributes.tags.filter(t => allFilters.geography[t]).map(t => allFilters.geography[t]) : [];

    const infoDescription = dataset.metadata && dataset.metadata.length && dataset.metadata[0].attributes.info.short_description &&
      dataset.metadata[0].attributes.info.short_description !== '' ?
      dataset.metadata[0].attributes.info.short_description : null;
    const metaDescription = dataset.metadata && dataset.metadata.length ?
      dataset.metadata[0].attributes.description : '';
    const description = infoDescription || metaDescription;

    return dataset ?
      <div className="content-container">
        {description && <div className="item-prop description">
          <span className="prop-label">Description: </span>
          <ReactMarkdown source={description} className="markdown" />
        </div>}
        {dataset.data_source && <div className="item-prop">
          <span className="prop-label">Data source: </span>
          <ReactMarkdown source={dataset.data_source} className="markdown" />
        </div>}
        {!!topicsList.length && <p className="item-prop topics"><span className="prop-label">Topics: </span>{topicsList.join(', ')}</p>}
        {!!areasList.length && <p className="item-prop areas"><span className="prop-label">Area: </span>{areasList.join(', ')}</p>}
      </div> :
      <div className="content-container" />;
  }

  getActionsBar() {
    const { dataset, metadata } = this.props;
    let layerIcon = null;
    let downloadIcon = null;

    if (dataset && dataset.layer && dataset.layer.length) {
      layerIcon = (
        <span className="info-tool layer">
          <Switch
            onChange={() => this.props.switchChange(dataset)}
            checked={dataset.active || false}
          />
          Map
        </span>
      );
    }

    if (dataset && dataset.metadata && dataset.metadata.length && dataset.metadata[0].attributes.info.data_download) {
      downloadIcon = (
        <a download href={dataset.metadata[0].attributes.info.data_download} className="info-tool download">
          <Icon name="icon-download" className="-medium" />
          Download
        </a>
      );
    }

    return (
      <nav className="info-actions">
        {downloadIcon}
        <Link to={`/dataset/${metadata.datasetSlug}`} className="info-tool more">
          <Icon name="icon-arrow-up-right" className="-medium" />
          Learn more
        </Link>
        {layerIcon}
      </nav>
    );
  }

  getWidget() {
    const { metadata, details } = this.props;
    const widgetComponents = [];
    const dataset = details[metadata.datasetSlug];
    const widgets = dataset.widget ? dataset.widget.filter(w => w.attributes.default) : [];

    widgets.forEach((w) => {
      const widget = w.attributes;

      if (widget.widget_config) {
        switch (widget.widget_config.type) {
          case 'map':
            widgetComponents.push(<div className="widget-container" key={w.id} ><SimpleMap layerId={widget.widget_config.layer_id} /></div>);
            break;
          default:
            widgetComponents.push(<div className="widget-container" key={w.id} ><VegaChart data={widget.widget_config} /></div>);
            break;
        }
      }
    });

    return widgetComponents;
  }

  toggleToolbarStatus() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  switchChange(dataset) {
    if (dataset.id === this.props.selectedDatasetId) this.props.deselectDataset();
    this.props.switchChange(dataset);
  }

  render() {
    const { metadata, details } = this.props;
    const detailDataset = details[metadata.datasetSlug];

    return (
      <div className={['c-info-sidebar', metadata.open ? '-open' : ''].join(' ')}>
        {metadata.open &&
          <div className="actions">
            <div>
              <button
                className="toggle-status"
                onClick={() => this.props.onClose()}
              >
                <Icon name="icon-arrow-left" className="-medium" />
              </button>
            </div>
          </div>
        }
        <div className="info-container">
          <div className="row content collapse">
            <div className="columns small-12 dataset-items">
              {isEmpty(details[metadata.datasetSlug]) && <LoadingSpinner />}
              {this.getHeader()}
              {this.getActionsBar()}
              {this.getContent()}
              {detailDataset && detailDataset.widget && this.getWidget()}
            </div>
          </div>
          {/* <div className="actions-mobile">
              <Button
              border
              click={() => this.toggleToolbarStatus()}
              >
              Apply
            </Button>

          </div> */}
        </div>
      </div>
    );
  }
}

InfoSidebar.propTypes = {
  dataset: PropTypes.object,
  /**
   * Define the dataset metadata
   */
  metadata: PropTypes.object,
  /**
   * Define the datasets details
   */
  details: PropTypes.object,
  /**
   * Define the layers on change switch function
   */
  switchChange: PropTypes.func.isRequired,
  /**
   * Define function to close info sidebar
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Define function to unselect dataset
   */
  deselectDataset: PropTypes.func,
  selectedDatasetId: PropTypes.string
};

InfoSidebar.defaultProps = {
};

export default InfoSidebar;
