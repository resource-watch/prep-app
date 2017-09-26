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
    const infoDescription = dataset && dataset.metadata && dataset.metadata.length && dataset.metadata[0].attributes.info.description &&
      dataset.metadata[0].attributes.info.description !== '' ?
      dataset.metadata[0].attributes.info.description : null;
    const metaDescription = dataset && dataset.metadata && dataset.metadata.length ?
      dataset.metadata[0].attributes.description : '';
    const description = infoDescription || metaDescription;

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
    const { dataset, selectedDatasetId, metadata, list } = this.props;
    let layerIcon = null;
    let downloadIcon = null;
    const datasetFiltered = list.find(d => d.id === metadata.datasetId) || {};
    const active = datasetFiltered && datasetFiltered.active;

    if (dataset && dataset.layer && dataset.layer.length) {
      layerIcon = (
        <button onClick={() => this.switchChange(dataset)} className="layer">
          <span
            title="Visibility"
            className={`icon ${dataset.id !== selectedDatasetId ? '-hide' : ''}`}
          >
            {active ?
              <svg xmlns="http://www.w3.org/2000/svg" width="39" height="32" viewBox="0 0 39 32"><title>show</title><path d="M26.905 4.994L32.03 0l3.481 3.392L6.155 32l-3.481-3.392 4.076-3.973a30.449 30.449 0 0 1-6.672-7.88l-.077-.142C3.775 10.06 11.194 3.419 19.693 3.419c2.523 0 4.948.583 7.212 1.575zM11.168 20.33l3.36-3.274a4.91 4.91 0 0 1-.017-.419v-.026.001c0-2.806 2.306-5.073 5.182-5.073.16 0 .32.007.475.02l3.36-3.274a9.305 9.305 0 0 0-3.812-.803h-.024.001c-5.145 0-9.329 4.086-9.329 9.132 0 1.324.288 2.58.805 3.717zm23.286-10.09a30.506 30.506 0 0 1 4.853 6.233l.077.143C35.61 23.166 28.211 29.81 19.692 29.81a17.105 17.105 0 0 1-4.766-.688l.121.03 3.557-3.466c.357.039.721.062 1.088.062 5.145 0 9.329-4.089 9.329-9.132 0-.345-.02-.689-.059-1.022l5.492-5.354z"/></svg> :
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="32" viewBox="0 0 47 32"><title>hide</title><path d="M17.149 16a6.127 6.127 0 1 0 12.248-.009v.01a6.127 6.127 0 1 0-12.248.009V16zm29.396 0C42.085 8.052 33.341 0 23.272 0 13.227 0 4.459 8.052-.001 16c4.46 7.948 13.228 16 23.273 16 10.068 0 18.813-8.052 23.273-16zM23.273 4.922c6.08 0 11.025 4.96 11.025 11.078s-4.945 11.078-11.025 11.078S12.248 22.118 12.248 16c0-6.118 4.945-11.078 11.025-11.078z"/></svg>
            }
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
