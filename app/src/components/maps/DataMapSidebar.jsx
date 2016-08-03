import React from 'react';
import { Link } from 'react-router';

import Switch from '../commons/Switch';
import Button from '../commons/Button';
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
    this.props.data.forEach((dataset, index) => {
      let icon;
      if (dataset.layers && dataset.layers.length) {
        icon = (<Switch
          onChange={() => this.props.switchChange(dataset)}
          checked={dataset.active || false}
        />);
      } else {
        icon = (<Link className="detail-link" to={`/data/dataset/${dataset.id}`}>
          <svg width="13" height="9" viewBox="0 0 13 9"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd" /></svg>
        </Link>);
      }
      layers.push(
        <div className="layer" key={`map-layer-${index}`}>
          {icon}
          <span className="title">{dataset.name}</span>
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
        <div className="content">
          <div className="tools">
            <a className="c-button -action" href="http://prepdata.sdgs.opendata.arcgis.com/" target="_blank">
              <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>icon download</title><g fill="none" fillRule="evenodd"><path d="M4 0h2v7H4zM0 10h10v2H0z" /><path d="M4.243 8.192l.707.707L9.9 3.95 8.484 2.537 4.95 6.07 1.414 2.536 0 3.95l4.243 4.242z" /></g></svg>
              Open data portal
            </a>
            <Button action click={() => this.props.setModalShare(true)}>
              <svg className="icon" width="10" height="12" viewBox="0 0 10 12"><title>icon-share</title><g fill="none" fillRule="evenodd"><path d="M6.45 1l1.414 1.414-4.95 4.95L1.5 5.95zM0 10h10v2H0z" /><path d="M9 1V0H2v2h5v5h2V1z" /></g></svg>
              Share
            </Button>
          </div>
          <div className="dataset-items">
            {content}
          </div>
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
  /**
  * Define the function to handle the share modal status
  */
  setModalShare: React.PropTypes.func.isRequired
};

export default DataMap;
