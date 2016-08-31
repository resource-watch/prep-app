import React from 'react';
import { Link } from 'react-router';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

function getBasicLegend(layer) {
  return (<div className="legend -basic">
    <div className="row">
      {layer.attributes['legend-config'].items.map((item, index) => (
        <div className="column small-6" key={index}>
          <div className="item">
            <span className="color" style={{ backgroundColor: item.color }}></span>
            <span className="value"> {item.value} </span>
          </div>
        </div>
      ))}
    </div>
  </div>);
}
function getGradientLegend(layer) {
  const colors = [];
  const values = [];
  layer.attributes['legend-config'].items.forEach((item, index) => {
    colors.push(item.color);
    values.push(<span key={index}>{item.value}</span>);
  });

  return (<div className="row">
    <div className="legend -gradient column small-12 ">
      {colors.length &&
        <div className="colors" style={{backgroundImage: `linear-gradient(to right, ${colors.join(',')})`}}></div>
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
  layer.attributes['legend-config'].items.forEach((item, index) => {
    columns.push(
      <div className="column" key={index}>
        <span className="-color" style={{ backgroundColor: item.color }}></span>
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
  switch (layer.attributes['legend-config'].type) {
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

const DragHandle = SortableHandle(() => <span className="handler"><svg width="6" height="18" viewBox="0 0 6 18"><title>Drag and drop</title><path d="M1 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fillRule="evenodd"/></svg></span>);

const SortableItem = SortableElement(({layer, index, onInfoClick}) => {
  return (
    <div className="legend-layer" key={`map-layer-${index}`}>
      <div className="row">
        <DragHandle />
        <div className="column small-10">
          <span className="title">{layer.title}&nbsp;
            {layer.attributes['legend-config'].unit &&
              (layer.attributes['legend-config'].unit)
            }
          </span>
        </div>
        <div className="column small-2 layer-actions">
          <Link className="icon" to={`/dataset/${layer.attributes['dataset-id']}`}>
            <svg width="13" height="9" viewBox="0 0 13 9"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd"/></svg>
          </Link>
          <span
            className="icon -info"
            onClick={() => onInfoClick(layer.attributes['dataset-id'])}
          > i </span>
        </div>
      </div>
      {getLegend(layer)}
    </div>
  );
});

const SortableList = SortableContainer(({items, onInfoClick}) => {
  return (
    <div className="content">
      {items.map((layer, index) =>
        <SortableItem key={`item-${index}`} index={index} layer={layer} onInfoClick={onInfoClick} />
      )}
    </div>
  );
});

class DataMapLegend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legendOpen: true
    };
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

  render() {
    let content;

    const legendClassNames = ['c-explore-legend'];
    if (!this.props.data || !this.props.data.length) { legendClassNames.push('-empty'); }

    if (this.props.data && this.props.data.length && this.state.legendOpen) {
      legendClassNames.push('-open');
      content = (<SortableList
        axis="y"
        lockAxis="y"
        lockToContainerEdges
        lockOffset="50%"
        useDragHandle
        items={this.props.data}
        onInfoClick={this.props.onInfoClick}
        onSortEnd={(oldI, newI) => this.onSortEnd(oldI, newI)}
      />);
    } else {
      content = <div className="content"></div>;
    }

    return (
      <div className={legendClassNames.join(' ')}>
        <div className="action-container">
          <span className="help">View legend</span>
          <span className="action open" onClick={() => this.toggleToolbarStatus()}>
            <svg width="10" height="7" viewBox="0 0 10 7"><title>Open</title><path d="M5.657.707L4.95 0 0 4.95l1.414 1.414L4.95 2.828l3.535 3.536L9.9 4.95 5.657.707z" fillRule="evenodd"/></svg>
          </span>
          <span className="action close" onClick={() => this.toggleToolbarStatus()}>
            <svg width="9" height="9" viewBox="0 0 9 9"><title>Close</title><path d="M4.5 3l-3-3L0 1.5l3 3-3 3L1.5 9l3-3 3 3L9 7.5l-3-3 3-3L7.5 0l-3 3z" fillRule="evenodd"/></svg>
          </span>
        </div>

        {content}

      </div>
    );
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
  * Define the function to the update the layers index
  */
  setLayersOrder: React.PropTypes.func.isRequired
};

export default DataMapLegend;
