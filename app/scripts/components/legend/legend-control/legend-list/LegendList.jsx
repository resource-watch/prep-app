import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import LegendListItem from '../legend-list-item/LegendListItem';
import './legend-list.scss';

const SortableItem = SortableElement(LegendListItem);

const SortableLegendList = SortableContainer(({ items }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem
        key={`sortable-item-${value.id}`}
        index={index}
        value={value}
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
    const { sortable } = this.props;
    const { items } = this.state;

    if (sortable) {
      return (
        <div className="c-legend-list">
          <SortableLegendList items={items} onSortEnd={this.onSortEnd} />
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
  onSortChange: PropTypes.func
};

LegendList.defaultProps = {
  onSortChange: () => {}
};

export default LegendList;
