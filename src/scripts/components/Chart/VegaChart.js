import React from 'react';
import vega from 'vega';

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

    const widthSpace = dataObj.padding ?
      dataObj.padding.left + dataObj.padding.right : 0;
    const heightSpace = dataObj.padding ?
    dataObj.padding.top + dataObj.padding.bottom : 0;

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

    vega.parse.spec(dataObj, chart => {
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
      <div ref="chartContainer" className="c-vega-chart">
        <div ref="vegaChart" className="chart"></div>
      </div>
    );
  }
}

VegaChart.propTypes = {
  /**
   * Define the chart data
   */
  data: React.PropTypes.any.isRequired
};

export default VegaChart;
