import React from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import SliderTooltip from '../Tooltip/SliderTooltip';
import LayersTooltip from '../Tooltip/LayersTooltip';

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
  <svg width="6" height="18" viewBox="0 0 6 18">
    <title>Drag and drop</title>
    <path
      d="M1 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fillRule="evenodd"
    />
  </svg>
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
            title="Layers"
            className="icon -layers"
            onClick={e => this.onClickLayers(e, layersGroup)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 34 32"><title>layers</title><path d="M29.995 17.712l4.29 2.859L17.142 32 .006 20.571l4.286-2.857 12.855 8.571 12.85-8.574zm4.286-6.283L17.145 22.858 0 11.429 17.143 0l17.138 11.429z"/></svg>
          </span>
        }
        <span
          title="Opacity"
          className="icon -opacity"
          onClick={e => this.onClickOpacity(e, layer)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="32" viewBox="0 0 29 32"><title>opacity</title><path d="M29.333 7.92a16.293 16.293 0 0 0-2.667-3.526v23.211a16.106 16.106 0 0 0 2.667-3.525V7.92zm-8-7.04a14.384 14.384 0 0 0-2.569-.762l-.098-.016v31.797c.92-.179 1.813-.443 2.667-.779V.88zm-8 31.12C5.786 30.819 0 24.107 0 16S5.787 1.181 13.333 0v32z"/></svg>
        </span>
        <span
          title="Visibility"
          className={`icon ${layer.opacity === 0 ? '-hide' : ''}`}
          onClick={() => this.props.toggleLayerOpacity(layer.dataset, layer.opacity === 0 ? 1 : 0)}
        >
          <svg width="13" height="9" viewBox="0 0 13 9"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd" /></svg>
        </span>
        <span
          title="Information"
          className="icon -info"
          onClick={() => this.props.onInfoClick(layer.dataset)}
        > i </span>
        <span
          title="Interactivity"
          className={`icon -select ${this.state.selectedDatasetId === layer.dataset ? '' : '-selected'}`}
          onClick={() => this.handleSelectedDataset(layer.dataset)}
        >
          <svg width="11" height="10" viewBox="-256.4 411.4 15 15">
            <path d="M-242 412.1h-13.8c-.4 0-.6.2-.6.6v9.4c0 .4.2.6.6.6h4.1l2.3 2.9c.1.1.3.2.5.2s.4-.1.5-.2l2.3-2.9h4.1c.4 0 .6-.2.6-.6v-9.4c0-.4-.2-.6-.6-.6z" />
          </svg>
        </span>
        <span
          title="Remove"
          className="icon -select remove"
          onClick={() => this.switchChange(layer)}
        >
          <svg width="9" height="9" viewBox="0 0 9 9">
            <title>Close</title>
            <path d="M4.5 3l-3-3L0 1.5l3 3-3 3L1.5 9l3-3 3 3L9 7.5l-3-3 3-3L7.5 0l-3 3z" fillRule="evenodd" />
          </svg>
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
          <div className="row">
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
              <svg width="9" height="9" viewBox="0 0 9 9">
                <title>Close</title>
                <path d="M4.5 3l-3-3L0 1.5l3 3-3 3L1.5 9l3-3 3 3L9 7.5l-3-3 3-3L7.5 0l-3 3z" fillRule="evenodd" />
              </svg>
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
      // content = <div className="content" />;
      content = <div className={legendClassNames.join(' ')} />;
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
  * Define the function to the handle the detail info click
  */
  onInfoClick: React.PropTypes.func.isRequired,
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
