import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { Link } from 'react-router';
import VegaChart from '../Chart/VegaChart';
import SimpleMap from '../../containers/Map/SimpleMap';
import LoadingSpinner from '../Loading/LoadingSpinner';

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
    const dataset = details[metadata.datasetId];
    let name = '';

    if (dataset) {
      name = dataset && dataset.metadata && dataset.metadata.length ?
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
    const dataset = details[metadata.datasetId];
    const allFilters = filtersConfig.filters;
    const topicsList = dataset && dataset.vocabulary && dataset.vocabulary.length ?
      dataset.vocabulary[0].attributes.tags.filter(t => allFilters.topics[t]).map(t => allFilters.topics[t]) : [];
    const areasList = dataset && dataset.vocabulary && dataset.vocabulary.length ?
      dataset.vocabulary[0].attributes.tags.filter(t => allFilters.geography[t]).map(t => allFilters.geography[t]) : [];
    const description = dataset && dataset.metadata && dataset.metadata.length ?
      dataset.metadata[0].attributes.description : '';

    return dataset ?
      <div className="content-container">
        <p className="item-prop description"><span className="prop-label">Description: </span>{description}</p>
        {/* <p className="item-prop"><span className="prop-label">Data source: </span>{dataset.data_source}</p> */}
        <p className="item-prop topics"><span className="prop-label">Topics: </span>{topicsList.join(', ')}</p>
        <p className="item-prop areas"><span className="prop-label">Area: </span>{areasList.join(', ')}</p>
      </div> :
      <div className="content-container" />;
  }

  getActionsBar() {
    const { dataset, selectedDatasetId } = this.props;
    let layerIcon = null;
    let downloadIcon = null;

    if (dataset && dataset.layer && dataset.layer.length) {
      layerIcon = (
        <button onClick={() => this.switchChange(dataset)} className="layer">
          <span
            title="Visibility"
            className={`icon ${dataset.id !== selectedDatasetId ? '-hide' : ''}`}
          >
            <svg width="13" height="9" viewBox="0 0 13 9"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd" /></svg>
          </span>
          Map
        </button>
      );
    }

    if (dataset && dataset.metadata && dataset.metadata.length && dataset.metadata[0].attributes.info.data_download) {
      downloadIcon = (
        <a download href={dataset.metadata[0].attributes.info.data_download} className="download">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" viewBox="0 0 26 32"><title>download</title><path d="M1.12 28.32h24v2.56h-24v-2.56zM11.531 0v18.255l-6.204-6.264-2.095 2.13L13.017 24l9.785-9.879-2.095-2.115-6.204 6.249V0z"/></svg>
          Download
        </a>
      );
    }

    return (
      <nav className="info-actions">
        {downloadIcon}
        <Link to={`/dataset/${dataset.id}`} className="more">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>arrow-up-right2</title><path d="M7.414 27.414L24 10.828V18a2 2 0 1 0 4 0V6a2 2 0 0 0-2-1.999V4H14a2 2 0 1 0 0 4h7.172L4.586 24.586C4.195 24.976 4 25.488 4 26s.195 1.024.586 1.414a2 2 0 0 0 2.828 0z"/></svg>
          Learn more
        </Link>
        {layerIcon}
      </nav>
    );
  }

  getWidget() {
    const { metadata, details } = this.props;
    const widgetComponents = [];
    const dataset = details[metadata.datasetId];
    const widgets = dataset.widget;

    if (widgets && widgets.length) {
      for (let i = 0, wLength = widgets.length; i < wLength; i++) {
        const widget = widgets[i].attributes;
        if (widget.widget_config) {
          switch (widget.widget_config.type) {
            case 'map':
              widgetComponents.push(<div className="widget-container" key={i} ><SimpleMap layerId={widget.widget_config.layer_id} /></div>);
              break;
            default:
              widgetComponents.push(<div className="widget-container" key={i} ><VegaChart data={widget.widget_config} /></div>);
              break;
          }
        }
      }
    }

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
    const detailDataset = details[metadata.datasetId];

    return (
      <div className={['c-info-sidebar', metadata.open ? '-open' : ''].join(' ')}>
        {metadata.open &&
          <div className="actions">
            <div>
              <button
                className="toggle-status"
                onClick={() => this.props.onClose()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 20 32"><title>arrow-left</title><path d="M20.364 5.071L16 0 0 16l16 16 4.364-5.071L8.221 16z"/></svg>
              </button>
            </div>
          </div>
        }
        <div className="info-container">
          <div className="row content collapse">
            <div className="columns small-12 dataset-items">
              {isEmpty(details[metadata.datasetId]) && <LoadingSpinner />}
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
  dataset: React.PropTypes.object,
  /**
   * Define the dataset metadata
   */
  metadata: React.PropTypes.object,
  /**
   * Define the datasets details
   */
  details: React.PropTypes.object,
  /**
   * Define the layers on change switch function
   */
  switchChange: React.PropTypes.func.isRequired,
  /**
   * Define function to close info sidebar
   */
  onClose: React.PropTypes.func.isRequired,
  /**
   * Define function to unselect dataset
   */
  deselectDataset: React.PropTypes.func,
  selectedDatasetId: React.PropTypes.string
};

InfoSidebar.defaultProps = {
};

export default InfoSidebar;
