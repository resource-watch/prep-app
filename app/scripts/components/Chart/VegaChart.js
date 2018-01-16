import React from 'react';
import vega from 'vega';
import theme from './theme';

class VegaChart extends React.Component {
  componentDidMount() {
    this.resizeEvent = () => {
      this.handleResize();
    };
    window.addEventListener('resize', this.resizeEvent);

    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  getData() {
    const { data } = this.props;
    let dataObj = {};

    if (typeof data === 'object') {
      dataObj = data;
    } else if (typeof data === 'string') {
      dataObj = JSON.parse(data);
    }

    let widthSpace = 50;
    let heightSpace = 50;

    if (dataObj.padding) {
      widthSpace = (dataObj.padding.left || 20) + (dataObj.padding.right || 20);
      heightSpace = (dataObj.padding.top || 25) + (dataObj.padding.bottom || 25);
    }

    dataObj.width = this.width - widthSpace;
    dataObj.height = this.height - heightSpace;

    return dataObj;
  }

  setSize() {
    this.width = this.refs.chartContainer.offsetWidth;
    this.height = this.refs.chartContainer.offsetHeight;
  }

  parseVega() {
    const dataObj = this.getData();
    const themeObj = theme();
    themeObj.width = dataObj.width;

    vega.parse.spec(dataObj, themeObj, (err, chart) => {
      if (err) throw err;

      const chartVis = chart({
        el: this.refs.vegaChart
      });

      chartVis.update();
    });
  }

  handleResize() {
    this.renderChart();
  }

  renderChart() {
    this.setSize();
    this.parseVega();
  }

  render() {
    return (
      <div ref="chartContainer" className={`c-vega-chart ${this.props.small ? '-small' : ''}`}>
        <div ref="vegaChart" className="chart" />
      </div>
    );
  }
}

VegaChart.propTypes = {
  /**
   * Define the chart data
   */
  data: React.PropTypes.any.isRequired,
  /**
   * Remove the min-height in component
   */
  small: React.PropTypes.bool
};

export default VegaChart;
