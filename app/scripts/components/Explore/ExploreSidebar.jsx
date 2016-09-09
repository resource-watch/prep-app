import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

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

  componentDidMount() {
    this.props.setTooltip({
      text: 'Climate Data Initiative dataset',
      width: '120'
    });
  }

  onTagHover(e) {
    // Get elements
    const tag = e.target;
    const tooltip = ReactDOM.findDOMNode(this.refs.tagTooltip);
    const tooltipParent = tooltip.parentNode;
    const tooltipText = tooltip.firstChild;
    // Get elements' position
    const tParentBounds = tooltipParent.getBoundingClientRect();
    const tagBounds = tag.getBoundingClientRect();
    // Get elements' height and width
    const tagWidth = tag.offsetWidth;
    const tagHeight = tag.offsetHeight;
    const tooltipTextWidth = tooltipText.offsetWidth;
    const tooltipTextHeight = tooltipText.offsetHeight;
    // Update the state of the tooltip
    this.props.setTooltip(
      {
        hidden: false,
        position: {
          top: (tagBounds.top - (tParentBounds.top + (tagHeight + tooltipTextHeight))),
          left: (tagBounds.left - (tooltipTextWidth / 2) + (tagWidth / 2))
        }
      });
  }

  onTagLeave() {
    this.props.setTooltip({ hidden: true });
  }

  getContent() {
    if (!this.props.data.length) {
      return <LoadingSpinner />;
    }

    const layers = this.props.data.map((dataset, index) => {
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
            partner = metadata.organization;
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
            {cdiTag
              ? <strong
                className="title"
                onClick={() => this.props.onInfoClick(dataset.id)}
              >
                {dataset.name}
                <div
                  onMouseEnter={(e) => this.onTagHover(e)}
                  onMouseLeave={() => this.onTagLeave()}
                  className="-highlighted-tag"
                >
                  CDI
                </div>
              </strong>
              : <strong
                className="title"
                onClick={() => this.props.onInfoClick(dataset.id)}
              >
                {dataset.name}
              </strong>
            }
            <span className="subtitle">{subtitle}</span>
            <span className="subtitle">Source: <strong>{partner}</strong></span>
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
        <Tooltip
          ref="tagTooltip"
          text={this.props.tooltip.text}
          hidden={this.props.tooltip.hidden}
          position={this.props.tooltip.position}
          width={this.props.tooltip.width}
        />
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
   * Define the dataset filters chosen
   */
  filters: React.PropTypes.object,
  /**
   * Define the tooltip text and position
   */
  setTooltip: React.PropTypes.func.isRequired,
  /**
   * Define function to show the dataset metadata
   */
  onInfoClick: React.PropTypes.func.isRequired,
  /**
   * Define the tooltip properties.
   */
  tooltip: React.PropTypes.object
};

export default DataMap;
