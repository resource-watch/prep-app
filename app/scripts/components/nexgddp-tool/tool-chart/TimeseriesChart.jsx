import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Vega from '../vega-chart/Vega';
import Icon from 'components/ui/Icon';
import Spinner from 'components/Loading/LoadingSpinner';
import './style.scss';

// Redux
import { setMarkerPosition, getChartData } from 'actions/nexgddptool';
import { getIndicatorUnit } from 'selectors/nexgddptool';

/* eslint-disable */
const chartSpec = {
  "data": [
    {
      "name": "table",
      "format": {"parse": {"date": "date"}},
      "values": []
    },
    {
      "name": "range1Data",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "test": "year(datum.date) >= utcyear(range1.start) && year(datum.date) <= utcyear(range1.end)"
        }
      ]
    },
    {
      "name": "range2Data",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "test": "range2 ? (year(datum.date) >= utcyear(range2.start) && year(datum.date) <= utcyear(range2.end)) : false"
        }
      ]
    }
  ],
  "signals": [
    {
      "name": "range1Middle",
      "init": {
        "expr": "(+range1.start + +range1.end) / 2"
      }
    },
    {
      "name": "range1Label",
      "init": {
        "expr": "utcyear(range1.start) + '-' + utcyear(range1.end)"
      }
    },
    {
      "name": "range2Middle",
      "init": {
        "expr": "range2 ? (+range2.start + +range2.end) / 2 : 0"
      }
    },
    {
      "name": "range2Label",
      "init": {
        "expr": "range2 ? utcyear(range2.start) + '-' + utcyear(range2.end) : ''"
      }
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "utc",
      "range": "width",
      "zero": false,
      "domain": {"data": "table","field": "date"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "zero": false,
      "nice": true,
      "domain": {
        "fields": [
          {"data": "table","field": "q75"},
          {"data": "table","field": "q25"}
        ]
      }
    }
  ],
  "axes": [
    {
      "type": "x",
      "scale": "x",
      "properties": {
        "labels": {
          "font": {"value": "Open Sans"},
          "fontSize": {"value": 10},
          "fill": {"value": "#3B4F63"},
          "opacity": {"value": 0.7}
        },
        "axis": {
          "stroke": {"value": "#393F44"},
          "opacity": {"value": 0.3}
        },
        "ticks": {
          "stroke": {"value": "#393F44"},
          "opacity": {"value": 0.3}
        },
      }
    },
    {
      "type": "y",
      "scale": "y",
      "properties": {
        "labels": {
          "font": {"value": "Open Sans"},
          "fontSize": {"value": 10},
          "fill": {"value": "#3B4F63"},
          "opacity": {"value": 0.7}
        },
        "axis": {
          "stroke": {"value": "#393F44"},
          "opacity": {"value": 0.3}
        },
        "ticks": {
          "stroke": {"value": "#393F44"},
          "opacity": {"value": 0.3}
        },
        "title": {
          "font": {"value": "Open Sans"},
          "fontSize": {"value": 10},
          "fill": {"value": "#3B4F63"},
          "opacity": {"value": 0.7}
        }
      }
    }
  ],
  "marks": [
    {
      "type": "area",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x","field": "date"},
          "y": {"scale": "y","field": "q75"},
          "y2": {"scale": "y","field": "q25"},
          "fill": {"value": "#E9ECEE"}
        }
      }
    },
    {
      "type": "line",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x","field": "date"},
          "y": {"scale": "y","field": "q50"},
          "stroke": {"value": "#263e57"},
          "strokeWidth": {"value": 2},
          "strokeDash": {"value": [8,8]}
        }
      }
    },
    {
      "type": "area",
      "from": {"data": "range1Data"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x","field": "date"},
          "y": {"scale": "y","field": "q75"},
          "y2": {"scale": "y","field": "q25"},
          "fillOpacity": {"value": 0},
          "strokeOpacity": {"value": 1},
          "stroke": {"value": "#EFA600"},
          "strokeWidth": {"value": 2}
        }
      }
    },
    {
      "type": "text",
      "from": {"data": "range1Data","transform": []},
      "properties": {
        "enter": {
          "x": {"scale": "x","signal": "range1Middle"},
          "y": {"scale": "y","field": "q75"},
          "dy": {"value": -10},
          "align": {"value": "center"},
          "text": {"template": "{{range1Label}}"},
          "font": {"value": "Open Sans"},
          "fontSize": {"value": 13},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "#EFA600"}
        }
      }
    },
    {
      "type": "area",
      "from": {"data": "range2Data"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x","field": "date"},
          "y": {"scale": "y","field": "q75"},
          "y2": {"scale": "y","field": "q25"},
          "fillOpacity": {"value": 0},
          "strokeOpacity": {"value": 1},
          "stroke": {"value": "#EFA600"},
          "strokeWidth": {"value": 2}
        }
      }
    },
    {
      "type": "text",
      "from": {"data": "range2Data","transform": []},
      "properties": {
        "enter": {
          "x": {"scale": "x","signal": "range2Middle"},
          "y": {"scale": "y","field": "q75"},
          "dy": {"value": -10},
          "align": {"value": "center"},
          "text": {"template": "{{range2Label}}"},
          "font": {"value": "Open Sans"},
          "fontSize": {"value": 13},
          "fontWeight": {"value": "bold"},
          "fill": {"value": "#EFA600"}
        }
      }
    }
  ]
};
/* eslint-enable */

class TimeseriesChart extends React.PureComponent {
  componentWillMount() {
    if (!this.props.chartDataLoaded) {
      this.props.getChartData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.chartDataLoaded && this.props.chartDataLoaded) {
      this.props.getChartData();
    }
  }

  render() {
    const { width, height, removeMarker, range1Selection, range2Selection, chartData, chartDataLoaded, chartDataError, indicatorUnit } = this.props;

    // If for some reason, the range 1 is not selected or if the data
    // failed to load, we return
    // The 1st reason happens when restoring the state from the URL
    if (!range1Selection || chartDataError) return null;

    const range1Signal = {
      name: 'range1',
      init: { expr: `{ start: utc(${range1Selection.value}, 0, 1), end: utc(${+range1Selection.value + 9}, 0, 1) }` }
    };

    const range2Signal = { name: 'range2', init: 'false' };
    if (range2Selection) {
      range2Signal.init = {
        expr: `{ start: utc(${range2Selection.value}, 0, 1), end: utc(${+range2Selection.value + 9}, 0, 1) }`
      };
    }

    const signals = [range1Signal, range2Signal, ...chartSpec.signals];

    // We create a new spec each time so the Vega component renders again
    // WARNING: it needs immutable data to detect the changes
    const spec = Object.assign({}, chartSpec, { signals });
    spec.data = [...spec.data];
    spec.data[0].values = chartData;

    // We add the unit to the y axis
    if (indicatorUnit) {
      const yAxis = Object.assign({}, spec.axes.find(axis => axis.type === 'y'), { title: indicatorUnit });
      spec.axes = [...spec.axes];
      for (let i = 0, j = spec.axes.length; i < j; i++) {
        if (spec.axes[i].type === 'y') {
          spec.axes[i] = yAxis;
          break;
        }
      }
    }

    return (
      <div className="c-tool-timeseries-chart">
        { !chartDataLoaded && <Spinner inner transparent /> }
        <button type="button" className="close-button" aria-label="Close chart" onClick={removeMarker}>
          <Icon name="icon-cross" />
        </button>
        { chartDataLoaded &&
          <Vega
            width={width}
            height={height}
            padding="strict"
            spec={spec}
          />
        }
      </div>
    );
  }
}

TimeseriesChart.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  removeMarker: PropTypes.func,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  chartDataLoaded: PropTypes.bool,
  getChartData: PropTypes.func,
  chartData: PropTypes.array,
  chartDataError: PropTypes.bool,
  indicatorUnit: PropTypes.string
};

TimeseriesChart.defaultProps = {
  width: 'auto',
  height: 350
};

const mapStateToProps = state => ({
  range1Selection: state.nexgddptool.range1.selection,
  range2Selection: state.nexgddptool.range2.selection,
  chartDataLoaded: state.nexgddptool.chart.loaded,
  chartData: state.nexgddptool.chart.data,
  chartDataError: state.nexgddptool.chart.error,
  indicatorUnit: getIndicatorUnit(state)
});

const mapDispatchToProps = dispatch => ({
  removeMarker: () => dispatch(setMarkerPosition(undefined)),
  getChartData: () => dispatch(getChartData())
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeseriesChart);
