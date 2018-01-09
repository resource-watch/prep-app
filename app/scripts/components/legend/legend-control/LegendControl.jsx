import React from 'react';
import PropTypes from 'prop-types';
import LegendList from './legend-list/LegendList';
// import { getTitle } from 'components/dataset-card/dataset-helper';
import './legend-control.scss';

export class LegendControl extends React.PureComponent {
  static getMultipleLegendList({ datasetsSpec }) {
    return datasetsSpec.map(d => (
      <div key={`legent-item-${d.id}`}>
        {/* <h2>{getTitle(d)}</h2> */}
        <LegendList items={d.layer} />
      </div>
    ));
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { layersSpec, datasetsSpec, position, sortable } = this.props;
    const { collapsed } = this.state;

    return (
      <div className={`c-legend-control -${position}`}>
        {collapsed ?
          <button type="button" onClick={this.toggle}>Open</button> :
          <button type="button" onClick={this.toggle}>Close</button>}
        <div className={`c-legend-panel ${collapsed ? '-collapsed' : ''}`}>
          { (layersSpec && layersSpec.length > 0) &&
            <LegendList
              onSortChange={this.props.onSortChange}
              items={layersSpec}
              sortable={sortable}
            /> }

          { (datasetsSpec && datasetsSpec.length > 0) &&
            LegendControl.getMultipleLegendList({ datasetsSpec }) }
        </div>
      </div>
    );
  }
}

LegendControl.propTypes = {
  layersSpec: PropTypes.array,
  datasetsSpec: PropTypes.array,
  sortable: PropTypes.bool,
  collapsed: PropTypes.bool,
  position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
  onSortChange: PropTypes.func
};

LegendControl.defaultProps = {
  layersSpec: [],
  datasetsSpec: [],
  sortable: true,
  collapsed: false,
  position: 'bottomright',
  onSortChange: () => {}
};

export default LegendControl;
