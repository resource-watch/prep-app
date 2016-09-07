import React from 'react';
import {Link} from 'react-router';

import FilterTabs from '../../containers/Explore/FilterTabs';
import Switch from '../Button/Switch';
import Button from '../Button/Button';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Tooltip from '../Tooltip/Tooltip';

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

    const {filters, data} = this.props;
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

      let subtitle = '';
      let partner = '';

      if (dataset.metadata && dataset.metadata.length) {
        const metadata = dataset.metadata[0].info.attributes;
        if (metadata) {
          if (metadata.subtitle) {
            subtitle = metadata.subtitle;
          }
          if (metadata.organization) {
            partner = <span>from <strong>{metadata.organization}</strong></span>;
          }
        }
      }

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
            <svg width="16" height="16" viewBox="0 0 16 16"><title>View page</title>
              <path d="M0 0v16h14v-2H2V2h12V0H0zm12 4l4 4-4 4V4zM6 7h6v2H6V7z" fillRule="evenodd"/>
            </svg>
          </Link>
        );
      }

      let cdiTag = false;
      for (let i = 0; i < dataset.tags.length; i++) {
        if (dataset.tags[i] === 'cdi') {
          cdiTag = true;
        }
      }

      return (
        <div className="layer" key={`map-layer-${index}`}>
          {layerIcon}
          <span className="layerItem">
            {cdiTag ?
              <strong className="title">{dataset.name}
                <Tooltip text="Climate Data Initiative dataset">
                  <div className="-highlighted-tag">CDI</div>
                </Tooltip>
              </strong> : <strong className="title">{dataset.name}</strong>}
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
