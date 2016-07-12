import React from 'react';
import { Link } from 'react-router';

import Switch from '../commons/Switch';
import Button from '../commons/Button';
import FilterTab from '../../containers/commons/FilterTab';
import LoadingSpinner from '../commons/LoadingSpinner';

class DataMap extends React.Component {
  constructor() {
    super();
    this.state = {
      sidebarOpen: true
    };
  }

  getContent() {
    if (!this.props.data.length) {
      return <LoadingSpinner />;
    }
    const layers = [];
    this.props.data.forEach((layer, index) => {
      let icon;
      if (layer.type === 'map') {
        icon = (<Switch
          onChange={() => this.props.switchChange(layer.id)}
          checked={layer.active || false}
        />);
      } else {
        icon = (<Link className="detail-link" to={`/data/${layer.slug}`}>
          <svg width="13" height="9" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd" /></svg>
        </Link>);
      }
      layers.push(
        <div className="layer" key={`map-layer-${index}`}>
          {icon}
          <span className="title">{layer.title}</span>
        </div>
      );
    });
    return layers;
  }

  toggleToolbarStatus() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  render() {
    let content = this.getContent();
    return (
      <div className={['c-data-map-sidebar', this.state.sidebarOpen ? '-open' : ''].join(' ')}>
        <div className="actions">
          <div>
            <button
              className={['toggle-status', this.state.sidebarOpen ? '-open' : ''].join(' ')}
              onClick={() => this.toggleToolbarStatus()}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className="header">
          <FilterTab />
        </div>
        <div className="content">
          {content}
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
  /**
  * Define the layers on change switch function
  */
  switchChange: React.PropTypes.func.isRequired,
};

export default DataMap;
