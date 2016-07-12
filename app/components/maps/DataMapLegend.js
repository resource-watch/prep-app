import React from 'react';

class DataMapLegend extends React.Component {
  constructor() {
    super();
    this.state = {
      legendOpen: true
    };
  }
  getContent() {
    const layers = [];
    this.props.data.forEach((layer, index) => {
      layers.push(
        <div className="layer" key={`map-layer-${index}`}>
          <span className="legend"></span>
          <span className="title">{layer.title}</span>
          <div className="actions">
            <span onClick={this.props.actionClick} className="icon">
              <svg width="13" height="9" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg"><title>icon-eye</title><path d="M4.933 4.5c0 .855.698 1.545 1.567 1.545s1.567-.69 1.567-1.545S7.369 2.955 6.5 2.955s-1.567.69-1.567 1.545zM13 4.5C11.755 2.265 9.312 0 6.5 0 3.695 0 1.245 2.265 0 4.5 1.245 6.735 3.695 9 6.5 9c2.812 0 5.255-2.265 6.5-4.5zm-9.415 0c0-1.582 1.307-2.865 2.915-2.865S9.415 2.918 9.415 4.5c0 1.582-1.307 2.865-2.915 2.865S3.585 6.082 3.585 4.5z" fillRule="evenodd"/></svg>
            </span>
            <span onClick={this.props.actionClick} className="icon">
              <svg width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg"><title>icon-target</title><path d="M6 9.973A4.502 4.502 0 0 0 9.973 6H11V5H9.973A4.502 4.502 0 0 0 6 1.027V0H5v1.027A4.502 4.502 0 0 0 1.027 5H0v1h1.027A4.502 4.502 0 0 0 5 9.973V11h1V9.973zm0-1.008A3.502 3.502 0 0 0 8.965 6H7V5h1.965A3.502 3.502 0 0 0 6 2.035V4H5V2.035A3.502 3.502 0 0 0 2.035 5H4v1H2.035A3.502 3.502 0 0 0 5 8.965V7h1v1.965z" fillRule="evenodd"/></svg>
            </span>
            <span onClick={this.props.actionClick} className="icon">
              <svg width="9" height="10" viewBox="0 0 9 10" xmlns="http://www.w3.org/2000/svg"><title>icon-time</title><path d="M6 2h1V0H6v2zM2 2h1V0H2v2zm5 .001v2H6v-2H3v2H2v-2H0V10h9V2.001H7zM1 9h7V5H1v4z" fillRule="evenodd"/></svg>
            </span>
            <span onClick={this.props.actionClick} className="icon -info">i</span>
          </div>
        </div>
      );
    });
    return layers;
  }

  toggleToolbarStatus() {
    this.setState({
      legendOpen: !this.state.legendOpen
    });
  }

  render() {
    let content;
    const legendClassNames = ['c-data-map-legend'];
    if (this.state.legendOpen) legendClassNames.push('-open');
    if (this.props.data.length) {
      content = this.getContent();
    } else {
      legendClassNames.push('-empty');
    }

    return (
      <div className={legendClassNames.join(' ')}>
        <div className="actions">
          <div>
            <button
              className={['toggle-status', this.state.legendOpen ? '-open' : ''].join(' ')}
              onClick={() => this.toggleToolbarStatus()}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className="content">
          {content}
        </div>
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
  * Define the function to the actions click
  */
  actionClick: React.PropTypes.func.isRequired,
};

export default DataMapLegend;
