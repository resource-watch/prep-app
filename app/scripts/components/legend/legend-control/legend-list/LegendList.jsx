import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import Icon from 'components/ui/Icon';
import LegendListItem from '../legend-list-item/LegendListItem';
import './legend-list.scss';

const DragHandle = SortableHandle(() => (
  <div className="handler">
    <Icon name="icon-drag-dots" className="-medium" />
  </div>
));

const SortableItem = SortableElement(props => (
  <div className="c-legend-draggable">
    <DragHandle />
    <LegendListItem {...props} />
  </div>
));

const SortableLegendList = SortableContainer(({ items, onClose, onInfo }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem
        key={`sortable-item-${value.id}`}
        index={index}
        value={value}
        onInfo={onInfo}
        onClose={onClose}
      />
    ))}
  </ul>
));

class LegendList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.items, this.props.items)) this.setState({ items: nextProps.items });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    }, () => this.props.onSortChange(this.state.items));
  }

  render() {
    const { sortable, onClose, onInfo } = this.props;
    const { items } = this.state;

    if (sortable) {
      return (
        <div className="c-legend-list">
          <SortableLegendList
            items={items}
            onSortEnd={this.onSortEnd}
            axis="y"
            lockAxis="y"
            lockToContainerEdges
            lockOffset="50%"
            useDragHandle
            onInfo={onInfo}
            onClose={onClose}
          />
        </div>
      );
    }

    return (
      <div className="c-legend-list">
        <ul>
          {items.map(value => (
            <LegendListItem key={`legend-item-${value.id}`} value={value} />
          ))}
        </ul>
      </div>
    );
  }
}

LegendList.propTypes = {
  items: PropTypes.array,
  sortable: PropTypes.bool,
  onSortChange: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

LegendList.defaultProps = {
  onSortChange: () => {},
  onInfo: () => {},
  onClose: () => {}
};

export default LegendList;
