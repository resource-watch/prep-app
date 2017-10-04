import React from 'react';
import ReactDOM from 'react-dom';

import FilterTabs from '../../containers/Explore/FilterTabs';
import Switch from '../Button/Switch';
import Button from '../Button/Button';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Tooltip from '../Tooltip/Tooltip';
import DatasetItem from './DatasetItem';

import {
  DATASET_ITEM_SAMPLE
} from './samples';

class DataMap extends React.Component {
  constructor() {
    super();
    this.state = {
      sidebarOpen: true
    };
  }

  componentWillMount() {
    this.props.onCloseInfo();
  }

  componentDidMount() {
    this.props.setTooltip({
      text: 'Climate Data Initiative dataset',
      width: '135'
    });
  }

  onTagHover(e) {
    // Get elements
    const tag = e.target;
    const tooltip = ReactDOM.findDOMNode(this.tagTooltip);
    const tooltipParent = tooltip.parentNode;
    // const tooltipText = tooltip.firstChild;

    // Get elements' position
    const tParentBounds = tooltipParent.getBoundingClientRect();
    const tagBounds = tag.getBoundingClientRect();

    // Get elements' height and width
    const tagWidth = tag.offsetWidth;
    // const tagHeight = tag.offsetHeight;
    // const tooltipTextWidth = tooltipText.offsetWidth;
    // const tooltipTextHeight = tooltipText.offsetHeight;

    // Update the state of the tooltip
    this.props.setTooltip(
      {
        hidden: false,
        // position: {
        //   top: (tagBounds.top - (tParentBounds.top + (tagHeight + tooltipTextHeight))),
        //   left: (tagBounds.left - (tooltipTextWidth / 2) + (tagWidth / 2))
        // },
        position: {
          top: tagBounds.top - tParentBounds.top,
          left: tagBounds.left + (tagWidth / 2)
        }
      }
    );
  }

  onTagLeave() {
    this.props.setTooltip({ hidden: true });
  }

  switchChange(dataset) {
    dataset.id === this.props.selectedDatasetId &&
      this.props.deselectDataset();
    this.props.switchChange(dataset);
  }

  getContent() {
    if (!this.props.listReceived) {
      return <LoadingSpinner />;
    }
    if (!this.props.data.length) {
      return <p>No datasets with these filters selected</p>;
    }

    const layers = this.props.data.map((dataset, index) => {
      const title = dataset.metadata && dataset.metadata.length ?
        dataset.metadata[0].attributes.name : dataset.name;
      let subtitle = '';
      let description = '';
      let cdiTag = false;
      const tags = [];

      let layerIcon = null;
      let datasetInfoElement = null;

      // Set metadata
      if (dataset.metadata && dataset.metadata.length) {
        const info = dataset.metadata[0].attributes.info;
        if (info) {
          if (info.organization) subtitle = info.organization;
          if (info.short_description) description = info.short_description;
        }
      }

      for (let i = 0; i < dataset.vocabulary[0].attributes.tags.length; i++) {
        tags.push(dataset.vocabulary[0].attributes.tags[i]);
        if (dataset.vocabulary[0].attributes.tags[i] === 'cdi') {
          cdiTag = true;
        }
      }

      // Set actions
      if (dataset.layer && dataset.layer.length) {
        layerIcon = (
          <Switch
            onChange={() => this.switchChange(dataset)}
            checked={dataset.active || false}
          />
        );
      }
      if (dataset.id) {
        datasetInfoElement = this.props.infoSidebarMetadata.open && this.props.infoSidebarMetadata.datasetId === dataset.id ?
          (<button key={'info-close'} onClick={() => this.props.onCloseInfo()} className="cancel">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>cancel</title><path d="M17.016 15.609L13.407 12l3.609-3.609-1.406-1.406-3.609 3.609-3.609-3.609-1.406 1.406L10.595 12l-3.609 3.609 1.406 1.406 3.609-3.609 3.609 3.609zM12 2.016c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016z"/></svg>
          </button>) :
          (<button key={'info-open'} onClick={() => this.props.onInfoClick(dataset.id)} className="info">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>info</title><path d="M18.107 14.899v-1.101h-6.603v2.201h2.201v6.603h-2.201v2.201h8.804v-2.201h-2.201v-7.703zm-2.201 16.508C7.397 31.407.499 24.509.499 16S7.397.593 15.906.593 31.313 7.491 31.313 16s-6.898 15.407-15.407 15.407zM13.705 7.196v4.402h4.402V7.196h-4.402z"/></svg>
          </button>);
      }

      const metadata = { title, subtitle, description, tags };

      return (
        <DatasetItem
          key={`map-layer-${index}`}
          leftElement={layerIcon}
          toolsElements={[datasetInfoElement]}
          metadata={metadata}
        />
        // <div className="layer" key={`map-layer-${index}`}>
        //   {layerIcon}
        //   <span className="layerItem">
        //     {cdiTag
        //       ? <strong
        //         className="title"
        //         onClick={() => this.props.onInfoClick(dataset.id)}
        //       >
        //         {name}
        //         <div
        //           onMouseEnter={e => this.onTagHover(e)}
        //           onMouseLeave={() => this.onTagLeave()}
        //           className="-highlighted-tag"
        //         >
        //           CDI
        //         </div>
        //       </strong>
        //       : <strong
        //         className="title"
        //         onClick={() => this.props.onInfoClick(dataset.id)}
        //       >
        //         {dataset.name}
        //       </strong>
        //     }
        //     <span className="subtitle">{subtitle}</span>
        //     { dataset.env === 'preproduction' ? <span style={{ color: 'red', fontSize: '11px' }}>Preproduction</span> : null }
        //     <span className="subtitle">Source: <strong>{partner}</strong></span>
        //   </span>
        //   {datasetInfo}
        // </div>
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
    const { infoSidebarMetadata } = this.props;
    const content = this.getContent();
    return (

      <div className={['c-explore-sidebar', this.state.sidebarOpen ? '-open' : ''].join(' ')}>
        {!infoSidebarMetadata.open &&
          <div className="actions">
            <div>
              <button
                className={['toggle-status', this.state.sidebarOpen ? '-open' : ''].join(' ')}
                onClick={() => this.toggleToolbarStatus()}
              >
                <span />
              </button>
            </div>
          </div>
        }
        <Tooltip
          ref={(tagTooltip) => {this.tagTooltip = tagTooltip}}
          text={this.props.tooltip.text}
          hidden={this.props.tooltip.hidden}
          position={this.props.tooltip.position}
          width={this.props.tooltip.width}
          padding="15px"
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
   * Define if got the dataset list
   */
  listReceived: React.PropTypes.bool,
  /**
   * Define if got the dataset list
   */
  infoSidebarMetadata: React.PropTypes.any,
  /**
   * Define the tooltip text and position
   */
  setTooltip: React.PropTypes.func.isRequired,
  /**
   * Define function to show the dataset metadata
   */
  onInfoClick: React.PropTypes.func.isRequired,
  /**
   * Define function to show the dataset metadata
   */
  onCloseInfo: React.PropTypes.func.isRequired,
  /**
   * Define function to unselect dataset
   */
  deselectDataset: React.PropTypes.func,
  selectedDatasetId: React.PropTypes.string,
  /**
   * Define the tooltip properties.
   */
  tooltip: React.PropTypes.object
};

export default DataMap;
