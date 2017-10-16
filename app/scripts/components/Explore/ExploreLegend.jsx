import React from 'react';

// Components
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import SliderTooltip from '../Tooltip/SliderTooltip';
import LayersTooltip from '../Tooltip/LayersTooltip';
import Icon from '../ui/Icon';

function getLinesLegend(layer) {
  return (<div className="legend -line">
    <div className="row">
      {layer.legend_config.items.map((item, index) => (
        <div className="column small-6" key={index}>
          <div className="item">
            <span className="color" style={{ backgroundColor: item.color }} />
            <span className="value"> {item.name} </span>
          </div>
        </div>
      ))}
    </div>
  </div>);
}

function getBasicLegend(layer) {
  return (<div className="legend -basic">
    <div className="row">
      {layer.legend_config.items.map((item, index) => (
        <div className="column small-6" key={index}>
          <div className="item">
            {item.icon
              ? <span className="icon" style={{ backgroundImage: `url(${item.icon})` }} />
              : <span className="color" style={{ backgroundColor: item.color }} />
            }
            <span className="value"> {item.name ? item.name : item.value} </span>
          </div>
        </div>
      ))}
    </div>
  </div>);
}

function getGradientLegend(layer) {
  const colors = [];
  const values = [];
  layer.legend_config.items.forEach((item, index) => {
    colors.push(item.color);
    values.push(<span key={index}>{item.value}</span>);
  });

  return (<div className="row">
    <div className="legend -gradient column small-12 ">
      {colors.length &&
        <div className="colors" style={{ backgroundImage: `linear-gradient(to right, ${colors.join(',')})` }} />
      }
      {values.length &&
        <div className="values">
          {values}
        </div>
      }
    </div>
  </div>);
}

function getCloroplethLegend(layer) {
  const columns = [];
  layer.legend_config.items.forEach((item, index) => {
    columns.push(
      <div className="column" key={index}>
        <span className="-color" style={{ backgroundColor: item.color }} />
        <span>{item.value}</span>
      </div>);
  });

  return (<div className="legend -cloropleth column small-12 ">
    <div className="row small-collapse">
      {columns}
    </div>
  </div>);
}

function getLegend(layer) {
  const type = layer && layer.legend_config && layer.legend_config.type || '';

  switch (type) {
    case 'lines':
      return getLinesLegend(layer);
    case 'basic':
      return getBasicLegend(layer);
    case 'gradient':
      return getGradientLegend(layer);
    case 'choropleth':
      return getCloroplethLegend(layer);
    default:
      return <div className="legend">No legend available</div>;
  }
}

const DragHandle = SortableHandle(() => <span className="handler">
  <Icon name="icon-drag-dots" className="-medium" />
</span>);

const SortableItem = SortableElement(({ value }) => value);

const SortableList = SortableContainer(({ items }) => (
  <div className="content">
    {items.map((value, index) =>
      <SortableItem key={value.key} index={index} value={value} />
    )}
  </div>
));


class DataMapLegend extends React.Component {
  /**
   * Return the position of a DOM element
   * @static
   * @param {HTMLElement} node
   * @returns {{ x: number, y: number }}
   */
  static getElementPosition(node) {
    const clientRect = node.getBoundingClientRect();
    return {
      x: window.scrollX + clientRect.left + (clientRect.width / 2),
      y: window.scrollY + clientRect.bottom + (clientRect.height * 2) + 8
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      legendOpen: true,
      selectedDatasetId: null,
      opacityTooltipOpen: false,
      layersTooltipOpen: false
    };

    // Bindings
    this.onClickOpacity = this.onClickOpacity.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ selectedDatasetId: newProps.selectedDatasetId });
  }

  /**
   * Event handler executed when the user moves the opacity slider
   * @param {Value} value
   * @param {LayerGroup} layerGroup
   */
  onChangeOpacity(value, layerGroup) {
    this.props.toggleLayerOpacity(layerGroup.dataset, value);
  }

  /**
   * Event handler executed when the user clicks the button
   * to change the opacity of a layer
   * @param {MouseEvent} e
   * @param {LayerGroup} layerGroup
   */
  onClickOpacity(e, layerGroup) { // eslint-disable-line class-methods-use-this
    // const opacity = layerGroup.layers.length && layerGroup.layers[0].opacity !== undefined ?
    //   layerGroup.layers[0].opacity : 1;
    const opacity = layerGroup.opacity !== undefined ? layerGroup.opacity : 1;

    this.setState({ opacityTooltipOpen: true, layersTooltipOpen: false });

    // We save the button that was used to open the tooltip
    // so we can compute its position later
    this.opacityButton = e.target;

    this.props.toggleTooltip(true, {
      follow: false,
      direction: 'top',
      position: DataMapLegend.getElementPosition(this.opacityButton),
      children: SliderTooltip,
      childrenProps: {
        className: '',
        title: 'Opacity',
        options: {
          min: 0, max: 1, step: 0.01, defaultValue: opacity
        },
        onChange: value => this.onChangeOpacity(value, layerGroup),
        onClose: () => {
          this.setState({ opacityTooltipOpen: false });
          this.props.toggleTooltip(false);
        }
      }
    });
  }

  /**
   * Event handler executed when the user clicks the button
   * to switch the layer for another one of the same dataset
   * @param {MouseEvent} e
   * @param {LayerGroup} layerGroup
   */
  onClickLayers(e, layerGroup) {
    this.setState({ layersTooltipOpen: true, opacityTooltipOpen: false });

    // If the user is opening the tooltip to select a layer
    // then the tour doesn't make any sense anymore
    // this.closeLayersTourTooltip();

    // We save the button that was used to open the tooltip
    // so we can compute its position later
    this.activeLayersButton = e.target;

    this.props.toggleTooltip(true, {
      follow: false,
      direction: 'top',
      position: DataMapLegend.getElementPosition(this.activeLayersButton),
      children: LayersTooltip,
      childrenProps: {
        layerGroup,
        onChangeLayer: this.props.setLayerGroupActiveLayer,
        onClose: () => {
          this.setState({ layersTooltipOpen: false });
          this.props.toggleTooltip(false);
        }
      }
    });
  }

  onSortEnd({ oldIndex, newIndex }) {
    const layers = arrayMove(this.props.data, oldIndex, newIndex);
    this.props.setLayersOrder(layers);
  }

  toggleToolbarStatus() {
    this.setState({
      legendOpen: !this.state.legendOpen
    });
  }

  handleSelectedDataset(datasetId) {
    if (this.state.selectedDatasetId) {
      this.setState({ selectedDatasetId: null });
      this.props.deselectDataset();
    } else {
      this.setState({ selectedDatasetId: datasetId });
      this.props.setDatasetSelected(datasetId);
    }
  }

  switchChange(layer) {
    const dataset = this.props.activeDatasets.find(d => d.layer && d.layer.length
      && d.layer.find(l => l.id === layer.id));

    if (dataset && dataset.id === this.props.selectedDatasetId) {
      this.props.deselectDataset();
    }
    this.props.switchChange(dataset);
  }

  groupDatasetLayers(layers) {
    const groups = {};
    layers.forEach((l) => {
      if (l.dataset) {
        if (groups[l.dataset] && groups[l.dataset].layers) groups[l.dataset].layers.push(l);
        else {
          groups[l.dataset] = {
            dataset: l.dataset,
            layers: [l]
          };
        }
      }
    });
    return Object.values(groups);
  }

  getItemActions(layersGroup) {
    const layer = layersGroup.layers.find(l => l.active) || layersGroup.layers.find(l => l.default) || {};

    return (
      <div className="layer-actions">
        {layersGroup.layers.length > 1 &&
          <span
            className="icon -layers -tooltip"
            data-title="Layers"
            onClick={e => this.onClickLayers(e, layersGroup)}
          >
            <Icon name="icon-layers" className="-normal" />
          </span>
        }
        <span
          data-title="Opacity"
          className="icon -opacity -tooltip"
          onClick={e => this.onClickOpacity(e, layer)}
        >
          <Icon name="icon-opacity" className="-normal" />
        </span>
        <span
          data-title="Visibility"
          className={`icon ${layer.opacity === 0 ? '-hide' : ''} -tooltip`}
          onClick={() => this.props.toggleLayerOpacity(layer.dataset, layer.opacity === 0 ? 1 : 0)}
        >
          {layer.opacity === 0 ?
            <Icon name="icon-hide" className="-normal" /> :
            <Icon name="icon-show" className="-normal" />
          }
        </span>
        {this.props.infoMetadata.open && this.props.infoMetadata.datasetId === layer.dataset ?
          <span
            data-title="Information"
            className="icon -info -tooltip"
            onClick={() => this.props.onCloseInfo()}
          >
            <Icon name="icon-cancel" className="-normal" />
          </span> :
          <span
            data-title="Information"
            className="icon -info -tooltip"
            onClick={() => this.props.onInfoClick(layer.dataset)}
          >
            <Icon name="icon-info" className="-normal" />
          </span>
        }
        {/* <span
          title="Interactivity"
          className={`icon -select ${this.state.selectedDatasetId === layer.dataset ? '' : '-selected'}`}
          onClick={() => this.handleSelectedDataset(layer.dataset)}
        >
          <svg width="11" height="10" viewBox="-256.4 411.4 15 15">
            <path d="M-242 412.1h-13.8c-.4 0-.6.2-.6.6v9.4c0 .4.2.6.6.6h4.1l2.3 2.9c.1.1.3.2.5.2s.4-.1.5-.2l2.3-2.9h4.1c.4 0 .6-.2.6-.6v-9.4c0-.4-.2-.6-.6-.6z" />
          </svg>
        </span> */}
        <span
          title="Remove"
          className="icon -select remove"
          onClick={() => this.switchChange(layer)}
        >
          <Icon name="icon-cross" className="-normal" />
        </span>
      </div>
    );
  }

  getItems() {
    const layersGroups = this.groupDatasetLayers(this.props.data) || [];

    return layersGroups.map((layersGroup) => {
      const layer = layersGroup.layers.find(l => l.active) || layersGroup.layers.find(l => l.default) || {};

      return (
        <div className="legend-layer" key={`map-layer-${layer.id}`}>
          <div className="row layer-header-container">
            <DragHandle />
            <div className="layer-header">
              <div className="">
                <span className="title">{layer.title}
                  <span className="-units">
                    {layer && layer.legend_config && layer.legend_config.unit &&
                    ` (${layer.legend_config.unit})`}
                  </span>
                </span>
              </div>
              {this.getItemActions(layersGroup)}
            </div>
          </div>
          {getLegend(layer)}
        </div>
      );
    });
  }

  render() {
    let content;

    const legendClassNames = ['c-explore-legend'];
    if (!this.props.data || !this.props.data.length) { legendClassNames.push('-empty'); }

    if (this.props.data && this.props.data.length && this.state.legendOpen) {
      legendClassNames.push('-open');
      content = (
        <div className={legendClassNames.join(' ')}>
          <div className="action-container">
            <span className="help">View legend</span>
            <span className="action open" onClick={() => this.toggleToolbarStatus()}>
              <svg width="10" height="7" viewBox="0 0 10 7">
                <title>Open</title>
                <path d="M5.657.707L4.95 0 0 4.95l1.414 1.414L4.95 2.828l3.535 3.536L9.9 4.95 5.657.707z" fillRule="evenodd" />
              </svg>
            </span>
            <span className="action close" onClick={() => this.toggleToolbarStatus()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 20 32"><title>arrow-left</title><path d="M20.364 5.071L16 0 0 16l16 16 4.364-5.071L8.221 16z"/></svg>
            </span>
          </div>

          <SortableList
            axis="y"
            lockAxis="y"
            lockToContainerEdges
            lockOffset="50%"
            useDragHandle
            items={this.getItems()}
            onSortEnd={(oldI, newI) => this.onSortEnd(oldI, newI)}
          />
        </div>
      );
    } else {
      content = (
        <div className={legendClassNames.join(' ')}>
          {this.props.data && this.props.data.length > 0 &&
            <div className="action-container">
              <span className="help">View legend</span>
              <span className="action open" onClick={() => this.toggleToolbarStatus()}>
                <svg width="10" height="7" viewBox="0 0 10 7">
                  <title>Open</title>
                  <path d="M5.657.707L4.95 0 0 4.95l1.414 1.414L4.95 2.828l3.535 3.536L9.9 4.95 5.657.707z" fillRule="evenodd" />
                </svg>
              </span>
              <span className="action close" onClick={() => this.toggleToolbarStatus()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 20 32"><title>arrow-left</title><path d="M20.364 5.071L16 0 0 16l16 16 4.364-5.071L8.221 16z"/></svg>
              </span>
            </div>
          }
        </div>
      );
    }

    return content;
  }
}

DataMapLegend.propTypes = {
  /**
  * Define the layers data of the map
  */
  data: React.PropTypes.array,
  /**
  * Define the layers data of the map
  */
  infoMetadata: React.PropTypes.object,
  /**
  * Define the function to handle the detail info click
  */
  onInfoClick: React.PropTypes.func.isRequired,
  /**
  * Define the function to close info click
  */
  onCloseInfo: React.PropTypes.func.isRequired,
  /**
  * Define the function to the toggle the layer opacity
  */
  toggleLayerOpacity: React.PropTypes.func.isRequired,
  /**
  * Define the function to the update the layers index
  */
  selectedDatasetId: React.PropTypes.string,
  activeDatasets: React.PropTypes.array,
  setLayersOrder: React.PropTypes.func.isRequired,
  setDatasetSelected: React.PropTypes.func.isRequired,
  deselectDataset: React.PropTypes.func,
  switchChange: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func,
  setLayerGroupActiveLayer: React.PropTypes.func
};

export default DataMapLegend;
