import React from 'react';
import ReactDOM from 'react-dom';

// Components
import FilterTabs from '../../containers/Explore/FilterTabs';
import Icon from '../ui/Icon';
import Tabs from '../ui/Tabs';
import Switch from '../Button/Switch';
import Button from '../Button/Button';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Tooltip from '../Tooltip/Tooltip';
import CoreDatasets from '../ui/CoreDatasets';
import AllDatasets from '../ui/AllDatasets';
import DatasetItem from './DatasetItem';

// Constants
import { TABS_OPTIONS } from '../../constants';


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

  getContent() {
    if (!this.props.listReceived) {
      return <LoadingSpinner />;
    }
    if (!this.props.data.length) {
      return <p>No datasets with these filters selected</p>;
    }

    const layers = this.props.data.map((dataset, index) => {
      const isInfoPanelOpen = dataset.id && this.props.infoSidebarMetadata.open &&
        this.props.infoSidebarMetadata.datasetId === dataset.id;
      const metadata = { title: '', subtitle: '', description: '', tags: [] };
      metadata.title = dataset.metadata && dataset.metadata.length ?
        dataset.metadata[0].attributes.name : dataset.name;

      let layerIcon = null;
      let datasetInfoElement = null;

      // Set metadata
      if (dataset.metadata && dataset.metadata.length) {
        const info = dataset.metadata[0].attributes.info;
        if (info) {
          if (info.organization) metadata.subtitle = info.organization;
          if (info.short_description) metadata.description = info.short_description;
        }
      }

      for (let i = 0; i < dataset.vocabulary[0].attributes.tags.length; i++) {
        metadata.tags.push(dataset.vocabulary[0].attributes.tags[i]);
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
        datasetInfoElement = isInfoPanelOpen ?
          (<button key={'info-close'} onClick={() => this.props.onCloseInfo()} className="cancel">
            <Icon name="icon-cancel" />
          </button>) :
          (<button key={'info-open'} onClick={() => this.props.onInfoClick(dataset.id)} className="info">
            <Icon name="icon-info" />
          </button>);
      }


      return {
        key: dataset.id,
        id: dataset.id,
        item: (
          <DatasetItem
            key={`map-layer-${dataset.id}`}
            leftElement={layerIcon}
            toolsElements={[datasetInfoElement]}
            metadata={metadata}
            layerActive={dataset.active || false}
            infoActive={isInfoPanelOpen}
          />
        )
      };
    });

    return layers;
  }

  switchChange(dataset) {
    dataset.id === this.props.selectedDatasetId &&
      this.props.deselectDataset();
    this.props.switchChange(dataset);
  }

  toggleToolbarStatus() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  render() {
    const { infoSidebarMetadata, selectedTab, data } = this.props;
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
          ref={(tagTooltip) => { this.tagTooltip = tagTooltip }}
          text={this.props.tooltip.text}
          hidden={this.props.tooltip.hidden}
          position={this.props.tooltip.position}
          width={this.props.tooltip.width}
          padding="15px"
        />
        <div className="row content">
          <FilterTabs />

          <Tabs options={TABS_OPTIONS} selected={selectedTab || TABS_OPTIONS[0].value} onChange={this.props.onChangeTab} />

          {selectedTab === 'core_datasets' ?
            <CoreDatasets data={content} switchChange={this.switchChange} /> :
            <AllDatasets data={content} switchChange={this.switchChange} />
          }
          {/* <div className="columns small-12 dataset-items">
            {content}
          </div> */}
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
  selectedTab: React.PropTypes.string,
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
  onChangeTab: React.PropTypes.func,
  selectedDatasetId: React.PropTypes.string,
  /**
   * Define the tooltip properties.
   */
  tooltip: React.PropTypes.object
};

export default DataMap;
