import React from 'react';
import { Link } from 'react-router';

import FilterTabs from '../../containers/Explore/FilterTabs';
import Switch from '../Button/Switch';
import Button from '../Button/Button';
import LoadingSpinner from '../Loading/LoadingSpinner';

class DataMap extends React.Component {
  constructor() {
    super();
    this.state = {
      sidebarOpen: true
    };
  }

  getContent() {
    if (!this.props.data.length) {
      return <LoadingSpinner />;
    }

    const { filters, data } = this.props;
    let filtersFlatten = [];
    let filteredDatasets = [];
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        filtersFlatten = filtersFlatten.concat(filters[key]);
      });
      if (filtersFlatten.length) {
        for (let i = data.length - 1; i >= 0; i--) {
          for (let j = filtersFlatten.length - 1; j >= 0; j--) {
            if (data[i].tags.indexOf(filtersFlatten[j]) > -1) {
              filteredDatasets.push(data[i]);
              break;
            }
          }
        }
      } else {
        filteredDatasets = data;
      }
    } else {
      filteredDatasets = data;
    }

    const layers = filteredDatasets.map((dataset, index) => {
      let layerIcon = (
        <div className="detail-space"></div>
      );

      let datasetIcon = null;

      const subtitle = dataset.metadata && dataset.metadata.length ?
        dataset.metadata[0].info.attributes.subtitle : '';

      const partner = dataset.metadata && dataset.metadata.length ?
        (<span>
          from <strong>{dataset.metadata[0].info.attributes.organization}</strong>
        </span>) : '';

      if (dataset.layers && dataset.layers.length) {
        layerIcon = (
          <Switch
            onChange={() => this.props.switchChange(dataset)}
            checked={dataset.active || false}
          />
        );
      }
      if (dataset.id) {
        datasetIcon = (
          <Link className="detail-link" to={`/dataset/${dataset.id}`}>
            <svg width="13" height="9" viewBox="0 0 13 9"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd" /></svg>
          </Link>
        );
      }

      return (
        <div className="layer" key={`map-layer-${index}`}>
          {layerIcon}
          <span className="layerItem">
            <strong className="title">{dataset.name}</strong>
            <span className="subtitle">{subtitle} {partner}</span>
          </span>
          {datasetIcon}
        </div>
      );
    });

    return layers;
  }

  toggleToolbarStatus() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  render() {
    const content = this.getContent();
    return (
      <div className={['c-explore-sidebar', this.state.sidebarOpen ? '-open' : ''].join(' ')}>
        <div className="actions">
          <div>
            <button
              className={['toggle-status', this.state.sidebarOpen ? '-open' : ''].join(' ')}
              onClick={() => this.toggleToolbarStatus()}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className="row content">
          <FilterTabs />
          <div className="columns small-12 dataset-items">
            {content}
          </div>
        </div>
        <div className="actions-mobile">
          <Button
            border
            click={() => this.toggleToolbarStatus()}
          >
            Apply
          </Button>

        </div>
      </div>
    );
  }
}

DataMap.propTypes = {
  /**
  * Define the layers data of the map
  */
  data: React.PropTypes.array,
  /**
  * Define the layers on change switch function
  */
  switchChange: React.PropTypes.func.isRequired,
  /**
  * Define the dataset filters choosen
  */
  filters: React.PropTypes.object
};

export default DataMap;
