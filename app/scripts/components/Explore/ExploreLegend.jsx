import React from 'react';
import { Link } from 'react-router';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="handler">🔝</span>);

const SortableItem = SortableElement(({layer, index, onInfoClick}) => {
  return (
    <div className="legend-layer row" key={`map-layer-${index}`}>
      <div className="column small-1">
        <DragHandle />
      </div>
      <div className="column small-2 align-self-middle">
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
        <div className={['action-container', this.state.legendOpen ? '-open' : ''].join(' ')}>
          <span className="help">View legend</span>
          <span className="action open" onClick={() => this.toggleToolbarStatus()}>^</span>
          <span className="action close" onClick={() => this.toggleToolbarStatus()}>X</span>
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
