import React from 'react';
import { Link } from 'react-router';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="handler"><svg width="6" height="18" viewBox="0 0 6 18"><title>Drag and drop</title><path d="M1 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fillRule="evenodd"/></svg></span>);

const SortableItem = SortableElement(({layer, index, onInfoClick}) => {
  return (
    <div className="legend-layer row align-middle" key={`map-layer-${index}`}>
      <DragHandle />
      <div className="column small-3">
        <span className="legend"></span>
      </div>
      <div className="column small-7">
        <span className="title">{layer.title}</span>
      </div>
      <div className="column small-2 layer-actions">
        <Link className="icon" to={`/data/dataset/${layer.attributes['dataset-id']}`}>
          <svg width="13" height="9" viewBox="0 0 13 9"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd"/></svg>
        </Link>
        <span
          className="icon -info"
          onClick={() => onInfoClick(layer.attributes['dataset-id'])}
        > i </span>
      </div>
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
  constructor() {
    super();
    this.state = {
      legendOpen: true
    };
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.layers = arrayMove(this.layers, oldIndex, newIndex);
  }

  toggleToolbarStatus() {
    this.setState({
      legendOpen: !this.state.legendOpen
    });
  }

  render() {
    let content;
    this.layers = this.props.data.slice(0, this.props.data.length);

    const legendClassNames = ['c-explore-legend'];
    if (!this.layers.length) { legendClassNames.push('-empty'); }

    if (this.layers.length && this.state.legendOpen) {
      legendClassNames.push('-open');
      content = (<SortableList
        axis="y"
        lockAxis="y"
        lockToContainerEdges
        lockOffset="50%"
        useDragHandle
        items={this.layers}
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
  onInfoClick: React.PropTypes.func.isRequired
};

export default DataMapLegend;
