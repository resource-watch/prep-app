import React from 'react';

class ClimateChange extends React.Component {
  render() {
    return (
      <div className="c-climate-change">
        <div className="row">
          <div className="column small-12">
            <p className="credits">Data from: <a href="http://climate.nasa.gov/vital-signs/carbon-dioxide/" target="_blank">NASA: Global Climate Change</a></p>
          </div>
        </div>
        <div className="box">
          <div className="row collapse">
            <div className="column small-12 medium-4">
              <div className="indicator">
                <h3>Global temperature</h3>
                <div className="value">
                  {this.props.temperature}
                  <sup className="unit">ºC</sup>
                </div>
                <p className="description">In January 2015 (relative to 1951-1880)</p>
              </div>
            </div>
            <div className="column small-12 medium-4">
              <div className="indicator">
                <h3>Carbon dioxide</h3>
                <div className="value">
                  {this.props.carbon}
                </div>
                <p className="description">Parts per million (July 2016)</p>
              </div>
            </div>
            <div className="column small-12 medium-4">
              <div className="indicator">
                <h3>Sea level</h3>
                <div className="value">
                  {this.props.seaLevel}
                </div>
                <p className="description">mm per year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClimateChange;
