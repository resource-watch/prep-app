import React from 'react';

class DataMapLegend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legendOpen: true
    };
  }

  getLinesLegend(layer) {
    return (<div className="legend -line">
      <div className="row">
        {layer.attributes['legend-config'].items.map((item, index) => (
          <div className="column small-6" key={index}>
            <div className="item">
              <span className="color" style={{ backgroundColor: item.color }}></span>
              <span className="value"> {item.name} </span>
            </div>
          </div>
        ))}
      </div>
    </div>);
  }

  getBasicLegend(layer) {
    return (<div className="legend -basic">
      <div className="row">
        {layer.attributes['legend-config'].items.map((item, index) => (
          <div className="column small-6" key={index}>
            <div className="item">
              {item.icon
                ? <span className="icon" style={{ backgroundImage: `url(${item.icon})` }}></span>
                : <span className="color" style={{ backgroundColor: item.color }}></span>
              }
              <span className="value"> {item.name ? item.name : item.value} </span>
            </div>
          </div>
        ))}
      </div>
    </div>);
  }

  getGradientLegend(layer) {
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

  getCloroplethLegend(layer) {
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

  getLegend(layer) {
    switch (layer.attributes['legend-config'].type) {
      case 'lines':
        return this.getLinesLegend(layer);
      case 'basic':
        return this.getBasicLegend(layer);
      case 'gradient':
        return this.getGradientLegend(layer);
      case 'choropleth':
        return this.getCloroplethLegend(layer);
      default:
        return <div className="legend">No legend available</div>;
    }
  }

  toggleToolbarStatus() {
    this.setState({
      legendOpen: !this.state.legendOpen
    });
  }

  render() {
    const legendClassNames = ['c-explore-legend'];

    if (this.props.layer && this.state.legendOpen) {
      legendClassNames.push('-open');
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

        {this.state.legendOpen &&
          <div className="legend-layer">
            <div className="column small-12 ">
              <span className="title">{this.props.layer.attributes.name}</span>
              {this.getLegend(this.props.layer)}
            </div>
          </div>
        }

      </div>
    );
  }
}

DataMapLegend.propTypes = {
  /**
  * Define the layer legend data
  */
  layer: React.PropTypes.object
};

export default DataMapLegend;
