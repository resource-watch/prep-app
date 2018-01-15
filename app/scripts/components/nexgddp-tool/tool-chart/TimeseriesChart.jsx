import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getConfig } from 'widget-editor';
import './style.scss';

// Redux
import { setMarkerPosition } from 'actions/nexgddptool';
import { getIndicatorUnit } from 'selectors/nexgddptool';
import { toggleTooltip } from 'actions/tooltip';

// Component
import Vega from '../vega-chart/Vega';
import Icon from 'components/ui/Icon';
import Spinner from 'components/Loading/LoadingSpinner';
import ShareNexgddpChartTooltip from 'components/Tooltip/ShareNexgddpChartTooltip';

/* eslint-disable */
const chartSpec = {
  "data": [
    {
      "name": "table",
      "format": {"parse": {"x": "date"}},
      "values": []
    },
    {
      "name": "range1Data",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "test": "year(datum.x) >= utcyear(range1.start) && year(datum.x) <= utcyear(range1.end)"
        }
      ]
    },
    {
      "name": "range2Data",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "test": "range2 ? (year(datum.x) >= utcyear(range2.start) && year(datum.x) <= utcyear(range2.end)) : false"
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
      "domain": {"data": "table","field": "x"}
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
          "x": {"scale": "x","field": "x"},
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
          "x": {"scale": "x","field": "x"},
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
          "x": {"scale": "x","field": "x"},
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
          "x": {"scale": "x","field": "x"},
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
  ],
  "interaction_config": [
    {
      "name": "tooltip",
      "config": {
        "fields": [
          {
            "key": "x",
            "label": "Date",
            "format": "%Y"
          },
          {
            "key": "q50",
            "label": "Average",
            "format": ".2f"
          },
          {
            "key": "q25",
            "label": "25th percentile",
            "format": ".2f"
          },
          {
            "key": "q75",
            "label": "75th percentile",
            "format": ".2f"
          }
        ]
      }
    }
]
};
/* eslint-enable */

class TimeseriesChart extends React.PureComponent {
  /**
   * Event handler executed when the user clicks the share button
   * @param {MouseEvent} e Event object
   */
  onClickShare(e) {
    // Prevent the tooltip from auto-closing
    e.stopPropagation();

    this.props.toggleTooltip(true, {
      follow: false,
      position: {
        x: window.scrollX + e.clientX,
        y: window.scrollY + e.clientY
      },
      direction: 'bottom',
      children: ShareNexgddpChartTooltip,
      childrenProps: {
        getWidgetConfig: this.generateVegaSpec.bind(this)
      }
    });
  }

  /**
   * Generate the vega specification
   * @returns {object}
   */
  generateVegaSpec() {
    const { range1Selection, range2Selection, chartData, indicatorUnit, chartDataError } = this.props;

    // If for some reason, the range 1 is not selected or if the data
    // failed to load, we return
    // The 1st reason happens when restoring the state from the URL
    if (!range1Selection || chartDataError) return null;

    const range1 = range1Selection.label.split('-')
      .map(v => +v);

    const range1Signal = {
      name: 'range1',
      init: { expr: `{ start: utc(${range1[0]}, 0, 1), end: utc(${range1[1]}, 0, 1) }` }
    };

    const range2Signal = { name: 'range2', init: 'false' };
    if (range2Selection) {
      const range2 = range2Selection.label.split('-')
        .map(v => +v);

      range2Signal.init = {
        expr: `{ start: utc(${range2[0]}, 0, 1), end: utc(${range2[1]}, 0, 1) }`
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

    return spec;
  }

  render() {
    const { width, height, removeMarker, range1Selection, chartDataLoaded, chartDataError, datasetId } = this.props;

    // If for some reason, the range 1 is not selected or if the data
    // failed to load, we return
    // The 1st reason happens when restoring the state from the URL
    if (!range1Selection || chartDataError) return null;

    const spec = this.generateVegaSpec();
    const canSave = !!getConfig().userToken;

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
        { chartDataLoaded && datasetId && canSave && (
          <div className="toolbar">
            <button type="button" className="share-button" onClick={e => this.onClickShare(e)} aria-label="Share/Save options">
              <Icon name="icon-share-dots" />
            </button>
          </div>
        )}
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
  chartData: PropTypes.array,
  chartDataError: PropTypes.bool,
  indicatorUnit: PropTypes.string,
  toggleTooltip: PropTypes.func,
  datasetId: PropTypes.string
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
  indicatorUnit: getIndicatorUnit(state),
  datasetId: state.nexgddptool.dataset ? state.nexgddptool.dataset.id : null
});

const mapDispatchToProps = dispatch => ({
  removeMarker: () => dispatch(setMarkerPosition(undefined)),
  toggleTooltip: (...params) => dispatch(toggleTooltip(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeseriesChart);
