import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deepClone from 'lodash/cloneDeep';
import { getConfig } from 'widget-editor';
import './style.scss';

// Redux
import { setMarkerPosition } from 'actions/nexgddptool';
import { getIndicatorId, getIndicatorUnitSignal } from 'selectors/nexgddptool';
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
      "values": [],
      "transform": [
        {
          "type":"formula",
           "field": "q25",
          "expr":"units.type =='factor' ? round(units.value*datum.q25,2) : ( datum.q25-units.value)"
        },
        {
          "type":"formula",
           "field": "q50",
          "expr":"units.type =='factor' ? round(units.value*datum.q50,2) : (datum.q50-units.value)"
        },
        {
          "type":"formula",
           "field": "q75",
          "expr":"units.type =='factor' ? round(units.value*datum.q75,2) : (datum.q75-units.value)"
        }
      ]
    },
    {
      "name": "range1Data",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "test": "year(datum.x) >= utcyear(range1.start) && year(datum.x) <= utcyear(range1.end)"
        },
        {
          "type":"formula",
          "field": "date_end",
          "expr":"range1.end"
        },
        {
          "type": "aggregate",
          "summarize": [
            {"field": "q25", "ops": ["min"], "as": ["q25"]},
            {"field": "q75", "ops": ["max"], "as": ["q75"]},
            {"field": "x", "ops": ["min"], "as": ["x"]},
            {"field": "date_end", "ops": ["min"], "as": ["date_end"]}
          ]
        }
      ]
    },
    {
      "name": "range2Data",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "test": "year(datum.x) >= utcyear(range2.start) && year(datum.x) <= utcyear(range2.end)"
        },
        {
          "type":"formula",
          "field": "date_end",
          "expr":"range2.end"
        },
        {
          "type": "aggregate",
          "summarize": [
            {"field": "q25", "ops": ["min"], "as": ["q25"]},
            {"field": "q75", "ops": ["max"], "as": ["q75"]},
            {"field": "x", "ops": ["min"], "as": ["x"]},
            {"field": "date_end", "ops": ["min"], "as": ["date_end"]}
          ]
        }
      ]
    },
    {
      "name": "legend",
      "values": [
        {"cat": "Models average"},
        {"cat": "Models amplitude between 25th and 75th percentile"},
        {"cat": "Selected period(s)"}
      ]
    }
  ],
  "signals": [
    {
      "name": "range1Middle",
      "init": {"expr": "(+range1.start + +range1.end) / 2"}
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
    },
    {
      "name": "color",
      "type": "ordinal",
      "zero": false,
      "points": true,
      "range": [
        "#E9ECEE",
        "#263e57",
        "#efa600"
      ],
      "domain": {
        "fields": [{"data": "legend","field": "cat"}],
        "sort": true
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
        }
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
      "type": "rect",
      "from": {"data": "range1Data"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x","field": "x"},
          "x2": {"scale": "x","field": "date_end"},
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
      "type": "rect",
      "from": {"data": "range2Data"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x","field": "x"},
          "x2": {"scale": "x","field": "date_end"},
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
  "legends": [
    {
      "fill": "color",
      "offset": 0,
      "properties": {
        "legend": {
          "x": {
            "field": {"group": "width"},
            "mult": 0.02,
            "offset": 0
          },
          "y": {
            "field": {"group": "height"},
            "mult": 0.01,
            "offset": 0
          }
        },
        "title": {
          "fontSize": {"value": 12},
          "dy": {"value": -2},
          "dx": {"value": 0}
        },
        "labels": {
          "fontSize": {"value": 12},
          "fill": {"value": "#3B4F63"},
          "opacity": {"value": 0.7},
          "text": {"template": "{{datum.data}}"}
        },
        "symbols": {
          "shape": {"value": "square"},
          "size": {"value": 30},
          "strokeOpacity":{"value": 0}
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
    const { range1Selection, range2Selection, chartData, indicatorId, indicatorUnitSignal, chartDataError } = this.props;

    // If for some reason, the range 1 is not selected or if the data
    // failed to load, we return
    // The 1st reason happens when restoring the state from the URL
    if (!range1Selection || chartDataError) return null;

    const range1 = range1Selection.label.split('-')
      .map(v => +v);

    const range1Signal = {
      name: 'range1',
      init: { expr: `{ start: utc(${range1[0]}, 0, 1), end: utc(${range1[1] + 1}, 0, 1) }` }
    };

    const range2Signal = { name: 'range2', init: 'false' };
    if (range2Selection) {
      const range2 = range2Selection.label.split('-')
        .map(v => +v);

      range2Signal.init = {
        expr: `{ start: utc(${range2[0]}, 0, 1), end: utc(${range2[1] + 1}, 0, 1) }`
      };
    }

    const unitsSignal = indicatorUnitSignal
      ? { name: 'units', init: { expr: JSON.stringify(indicatorUnitSignal) } }
      : null;

    const signals = [range1Signal, range2Signal, unitsSignal, ...chartSpec.signals]
      .filter(signal => signal !== null);

    // We create a new spec each time so the Vega component renders again
    // WARNING: it needs immutable data to detect the changes
    const spec = Object.assign({}, chartSpec, { signals });
    spec.data = [...spec.data];
    spec.data[0].values = chartData;

    // We add the unit to the y axis
    if (indicatorUnitSignal) {
      const yAxis = Object.assign({}, spec.axes.find(axis => axis.type === 'y'), { title: indicatorUnitSignal.to });
      spec.axes = [...spec.axes];
      for (let i = 0, j = spec.axes.length; i < j; i++) {
        if (spec.axes[i].type === 'y') {
          spec.axes[i] = yAxis;
          break;
        }
      }
    }

    // For some indicators, we move the legend to the bottom
    // of the chart
    if (indicatorId === 'hdds' || indicatorId === 'cum_pr') {
      spec.legends = spec.legends.slice(0);
      spec.legends[0] = deepClone(spec.legends[0]);
      spec.legends[0].properties.legend.y.mult = 0.8;
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
  indicatorId: PropTypes.string,
  indicatorUnitSignal: PropTypes.object,
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
  indicatorId: getIndicatorId(state),
  indicatorUnitSignal: getIndicatorUnitSignal(state),
  datasetId: state.nexgddptool.dataset ? state.nexgddptool.dataset.id : null
});

const mapDispatchToProps = dispatch => ({
  removeMarker: () => dispatch(setMarkerPosition(undefined)),
  toggleTooltip: (...params) => dispatch(toggleTooltip(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeseriesChart);
