import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Icon from '../ui/Icon';
import Tabs from '../ui/Tabs';
import Switch from '../Button/Switch';
import Button from '../Button/Button';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Tooltip from '../Tooltip/Tooltip';
import DatasetsList from '../ui/DatasetsList';
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
    const { infoSidebarMetadata, selectedTab } = this.props;

    return (
      <div className={['c-explore-sidebar', this.state.sidebarOpen ? '-open' : ''].join(' ')}>
        {!infoSidebarMetadata.open &&
          <div className="actions">
            <div>
              <button
                className={['toggle-status', this.state.sidebarOpen ? '-open' : ''].join(' ')}
                onClick={() => this.toggleToolbarStatus()}
              >
                {this.state.sidebarOpen ?
                  <Icon name="icon-arrow-left" className="-normal" /> :
                  <Icon name="icon-arrow-right" className="-normal" />
                }
              </button>
            </div>
          </div>
        }
        <Tooltip
          ref={(tagTooltip) => { this.tagTooltip = tagTooltip; }}
          text={this.props.tooltip.text}
          hidden={this.props.tooltip.hidden}
          position={this.props.tooltip.position}
          width={this.props.tooltip.width}
          padding="15px"
        />
        <header className="sidebar-header">
          {/* <FilterTabs /> */}
          <h1 className="sidebar-title">Explore</h1>
          <Tabs options={TABS_OPTIONS} selected={selectedTab || TABS_OPTIONS[0].value} onChange={this.props.onChangeTab} />
        </header>

        <div className="content">
          {!this.props.listReceived && <LoadingSpinner />}

          <DatasetsList
            data={this.props.data}
            type={selectedTab}
            infoSidebarMetadata={this.props.infoSidebarMetadata}
            onChangeTab={this.props.onChangeTab}
            onSwitchChange={this.switchChange}
            onCloseInfo={this.props.onCloseInfo}
            onInfoClick={this.props.onInfoClick}
          />

          {!this.props.data.length &&
            <p className="no-data">No datasets with these filters selected</p>
          }
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
