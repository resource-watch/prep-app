import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deepClone from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { getConfig, VegaChart } from 'widget-editor';

// Redux
import { setMarkerPosition } from 'actions/nexgddptool';
import { getIndicatorId, getIndicatorUnitSignal } from 'selectors/nexgddptool';
import { toggleTooltip } from 'actions/tooltip';

// Component
import Icon from 'components/ui/Icon';
import Spinner from 'components/Loading/LoadingSpinner';
import ShareNexgddpTooltip from 'components/Tooltip/ShareNexgddpTooltip';

import './style.scss';

/* eslint-disable */
const chartSpec = {
  "data": [
    {
      "name": "table",
      "format": {"parse": {"x": "date"}},
      "values": [],
      "transform": [
        {
          "type": "formula",
          "as": "q25",
          "expr": "units.type =='factor' ? round(units.value*datum.q25,2) : ( datum.q25-units.value)"
        },
        {
          "type": "formula",
          "as": "q50",
          "expr": "units.type =='factor' ? round(units.value*datum.q50,2) : (datum.q50-units.value)"
        },
        {
          "type": "formula",
          "as": "q75",
          "expr": "units.type =='factor' ? round(units.value*datum.q75,2) : (datum.q75-units.value)"
        }
      ]
    },
    {
      "name": "range1Data",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "year(datum.x) >= utcyear(range1.start) && year(datum.x) <= utcyear(range1.end)"
        },
        {
          "type": "formula",
          "as": "date_end",
          "expr": "range1.end"
        },
        {
          "type": "formula",
          "as": "date_start",
          "expr": "range1.start"
        },
        {
          "type": "aggregate",
          "fields": [
            "q25",
            "q75",
            "x",
            "date_end",
            "date_start"
          ],
          "ops": [
            "min",
            "max",
            "min",
            "min",
            "min"
          ],
          "as": [
            "q25",
            "q75",
            "x",
            "date_end",
            "date_start"
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
          "expr": "year(datum.x) >= utcyear(range2.start) && year(datum.x) <= utcyear(range2.end)"
        },
        {
          "type": "formula",
          "as": "date_end",
          "expr": "range2.end"
        },
        {
          "type": "formula",
          "as": "date_start",
          "expr": "range2.start"
        },
        {
          "type": "aggregate",
          "fields": [
            "q25",
            "q75",
            "x",
            "date_end",
            "date_start"
          ],
          "ops": [
            "min",
            "max",
            "min",
            "min",
            "min"
          ],
          "as": [
            "q25",
            "q75",
            "x",
            "date_end",
            "date_start"
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
    },
    {
      "name": "dots",
      "source": "table",
      "transform": [
        {
          "type": "filter",
          "expr": "hover && hover.datum.x === datum.x"
        }
      ]
    }
  ],
  "signals": [
    {
      "name": "range1Middle",
      "update": "(+range1.start + +range1.end) / 2"
    },
    {
      "name": "range1Label",
      "update": "utcyear(range1.start) + '-' + utcyear(range1.end)"
    },
    {
      "name": "range2Middle",
      "update": "range2 ? (+range2.start + +range2.end) / 2 : 0"
    },
    {
      "name": "range2Label",
      "update": "range2 ? utcyear(range2.start) + '-' + utcyear(range2.end) : ''"
    },
    {
      "name": "hover",
      "value": null,
      "on": [
        {
          "events": "@cell:mouseover",
          "update": "datum"
        },
        {
          "events": "@cell:mouseout",
          "update": "null"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "utc",
      "range": "width",
      "zero": false,
      "domain": {
        "data": "table",
        "field": "x"
      }
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "zero": false,
      "nice": true,
      "domain": {
        "fields": [
          {
            "data": "table",
            "field": "q75"
          },
          {
            "data": "table",
            "field": "q25"
          }
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
        "fields": [
          {
            "data": "legend",
            "field": "cat"
          }
        ],
        "sort": true
      }
    }
  ],
  "axes": [
    {
      "scale": "x",
      "labelOverlap": "parity",
      "orient": "bottom",
      "encode": {
        "labels": {
          "update": {
            "font": {
              "value": "Open Sans"
            },
            "fontSize": {
              "value": 10
            },
            "fill": {
              "value": "#3B4F63"
            },
            "opacity": {
              "value": 0.7
            }
          }
        },
        "axis": {
          "update": {
            "stroke": {
              "value": "#393F44"
            },
            "opacity": {
              "value": 0.3
            }
          }
        },
        "ticks": {
          "update": {
            "stroke": {
              "value": "#393F44"
            },
            "opacity": {
              "value": 0.3
            }
          }
        }
      }
    },
    {
      "scale": "y",
      "zindex": 1,
      "labelOverlap": "parity",
      "orient": "left",
      "encode": {
        "labels": {
          "update": {
            "font": {
              "value": "Open Sans"
            },
            "fontSize": {
              "value": 10
            },
            "fill": {
              "value": "#3B4F63"
            },
            "opacity": {
              "value": 0.7
            }
          }
        },
        "axis": {
          "update": {
            "stroke": {
              "value": "#393F44"
            },
            "opacity": {
              "value": 0.3
            }
          }
        },
        "ticks": {
          "update": {
            "stroke": {
              "value": "#393F44"
            },
            "opacity": {
              "value": 0.3
            }
          }
        },
        "title": {
          "update": {
            "font": {
              "value": "Open Sans"
            },
            "fontSize": {
              "value": 10
            },
            "fill": {
              "value": "#3B4F63"
            },
            "opacity": {
              "value": 0.7
            }
          }
        }
      }
    }
  ],
  "marks": [
    {
      "type": "area",
      "interactive": false,
      "from": {
        "data": "table"
      },
      "encode": {
        "enter": {
          "interpolate": {
            "value": "monotone"
          },
          "x": {
            "scale": "x",
            "field": "x"
          },
          "y": {
            "scale": "y",
            "field": "q75"
          },
          "y2": {
            "scale": "y",
            "field": "q25"
          },
          "fill": {
            "value": "#E9ECEE"
          }
        }
      }
    },
    {
      "name": "lines",
      "interactive": false,
      "type": "line",
      "from": {
        "data": "table"
      },
      "encode": {
        "enter": {
          "interpolate": {
            "value": "monotone"
          },
          "x": {
            "scale": "x",
            "field": "x"
          },
          "y": {
            "scale": "y",
            "field": "q50"
          },
          "stroke": {
            "value": "#263e57"
          },
          "strokeWidth": {
            "value": 2
          },
          "strokeDash": {
            "value": [
              8,
              8
            ]
          }
        }
      }
    },
    {
      "type": "rect",
      "interactive": false,
      "from": {
        "data": "range1Data"
      },
      "encode": {
        "enter": {
          "interpolate": {
            "value": "monotone"
          },
          "x": {
            "scale": "x",
            "field": "x"
          },
          "y": {
            "scale": "y",
            "field": "q75"
          },
          "y2": {
            "scale": "y",
            "field": "q25"
          },
          "fillOpacity": {
            "value": 0
          },
          "strokeOpacity": {
            "value": 1
          },
          "stroke": {
            "value": "#EFA600"
          },
          "strokeWidth": {
            "value": 2
          }
        }
      }
    },
    {
      "type": "text",
      "interactive": false,
      "from": {
        "data": "range1Data"
      },
      "encode": {
        "enter": {
          "x": {
            "scale": "x",
            "signal": "range1Middle"
          },
          "y": {
            "scale": "y",
            "field": "q75"
          },
          "dy": {
            "value": -10
          },
          "align": {
            "value": "center"
          },
          "text": {
            "signal": "range1Label"
          },
          "font": {
            "value": "Open Sans"
          },
          "fontSize": {
            "value": 13
          },
          "fontWeight": {
            "value": "bold"
          },
          "fill": {
            "value": "#EFA600"
          }
        }
      }
    },
    {
      "type": "rect",
      "interactive": false,
      "from": {
        "data": "range2Data"
      },
      "encode": {
        "enter": {
          "interpolate": {
            "value": "monotone"
          },
          "x": {
            "scale": "x",
            "field": "x"
          },
          "y": {
            "scale": "y",
            "field": "q75"
          },
          "y2": {
            "scale": "y",
            "field": "q25"
          },
          "fillOpacity": {
            "value": 0
          },
          "strokeOpacity": {
            "value": 1
          },
          "stroke": {
            "value": "#EFA600"
          },
          "strokeWidth": {
            "value": 2
          }
        }
      }
    },
    {
      "type": "text",
      "interactive": false,
      "from": {
        "data": "range2Data"
      },
      "encode": {
        "enter": {
          "x": {
            "scale": "x",
            "signal": "range2Middle"
          },
          "y": {
            "scale": "y",
            "field": "q75"
          },
          "dy": {
            "value": -10
          },
          "align": {
            "value": "center"
          },
          "text": {
            "signal": "range2Label"
          },
          "font": {
            "value": "Open Sans"
          },
          "fontSize": {
            "value": 13
          },
          "fontWeight": {
            "value": "bold"
          },
          "fill": {
            "value": "#EFA600"
          }
        }
      }
    },
    {
      "name": "points",
      "interactive": false,
      "type": "symbol",
      "from": {
        "data": "dots"
      },
      "encode": {
        "enter": {
          "fill": {
            "value": "#263e57"
          },
          "stroke": {
            "value": "#fff"
          },
          "x": {
            "scale": "x",
            "field": "x"
          },
          "y": {
            "scale": "y",
            "field": "q50"
          }
        },
        "update": {
          "zindex": {
            "value": 10
          },
          "opacity": {
            "value": 1
          }
        }
      }
    },
    {
      "name": "cell",
      "type": "path",
      "from": {
        "data": "lines"
      },
      "transform": [
        {
          "type": "voronoi",
          "x": "datum.x",
          "y": "datum.y",
          "size": [
            {
              "signal": "width"
            },
            {
              "signal": "height"
            }
          ]
        }
      ],
      "encode": {
        "update": {
          "fill": {
            "value": "red"
          },
          "path": {
            "field": "path"
          },
          "opacity": {
            "value": 0
          }
        }
      }
    }
  ],
  "legends": [
    {
      "fill": "color",
      "orient": "bottom",
      "encode": {
        "title": {
          "enter": {
            "fontSize": {
              "value": 12
            }
          }
        },
        "labels": {
          "enter": {
            "limit": {
              "signal": "(width*0.9)"
            },
            "fontSize": {
              "value": 12
            },
            "fill": {
              "value": "#3B4F63"
            },
            "opacity": {
              "value": 0.7
            }
          }
        },
        "symbols": {
          "enter": {
            "shape": {
              "value": "square"
            },
            "size": {
              "value": 50
            }
          }
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
            "column": "datum.q50",
            "property": "Average",
            "type": "number",
            "format": ".2f"
          },
          {
            "column": "datum.q25",
            "property": "25th percentile",
            "type": "number",
            "format": ".2f"
          },
          {
            "column": "datum.q75",
            "property": "75th percentile",
            "type": "number",
            "format": ".2f"
          },
          {
            "column": "datum.range",
            "property": "Date range",
            "type": "string",
            "format": null
          }
        ]
      }
    }
  ]
};
/* eslint-enable */

class TimeseriesChart extends React.Component {
  /**
   * Generate the vega specification
   * @param {object} props Props
   * @returns {object}
   */
  static generateVegaSpec(props) {
    const { range1Selection, range2Selection, chartData, indicatorId, indicatorUnitSignal, chartDataError } = props;

    // If for some reason, the range 1 is not selected or if the data
    // failed to load, we return
    // The 1st reason happens when restoring the state from the URL
    if (!range1Selection || chartDataError) return null;

    const range1 = range1Selection.label.split('-')
      .map(v => +v);

    const range1Signal = {
      name: 'range1',
      update: `{ start: utc(${range1[0]}, 0, 1), end: utc(${range1[1]}, 0, 1) }`
    };

    const range2Signal = { name: 'range2', update: 'false' };
    if (range2Selection) {
      const range2 = range2Selection.label.split('-')
        .map(v => +v);

      range2Signal.update = `{ start: utc(${range2[0]}, 0, 1), end: utc(${range2[1]}, 0, 1) }`;
    }

    const unitsSignal = indicatorUnitSignal
      ? { name: 'units', update: JSON.stringify(indicatorUnitSignal) }
      : null;

    const signals = [range1Signal, range2Signal, unitsSignal, ...chartSpec.signals]
      .filter(signal => signal !== null);

    // We create a new spec each time so the Vega component renders again
    // WARNING: it needs immutable data to detect the changes
    const spec = Object.assign({}, chartSpec, { signals });
    spec.data = [...spec.data];

    // We add a new column to the data "range" so we can display the
    // date range in the tooltip
    const resolution = chartData.length >= 2
      ? new Date(chartData[1].x).getUTCFullYear() - new Date(chartData[0].x).getUTCFullYear()
      : null;
    spec.data[0].values = chartData.map((d) => {
      if (!resolution) return d;
      const start = new Date(d.x).getUTCFullYear();
      const end = (start + resolution) - 1;
      return Object.assign({}, d, { range: `${start}-${end}` });
    });

    // We add the unit to the y axis
    if (indicatorUnitSignal) {
      const yAxis = Object.assign({}, spec.axes.find(axis => axis.scale === 'y'), { title: indicatorUnitSignal.to });
      spec.axes = [...spec.axes];
      for (let i = 0, j = spec.axes.length; i < j; i++) {
        if (spec.axes[i].scale === 'y') {
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

  constructor(props) {
    super(props);
    this.state = {
      chartLoaded: false,
      vegaSpec: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const propsChanged = !isEqual(this.props, nextProps);

    if (propsChanged) {
      const vegaSpec = TimeseriesChart.generateVegaSpec(nextProps);
      this.setState({ vegaSpec });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsChanged = !isEqual(this.props, nextProps);
    const stateChanged = !isEqual(this.state, nextState);
    return propsChanged || stateChanged;
  }

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
      children: ShareNexgddpTooltip,
      childrenProps: {
        render: 'chart',
        getWidgetConfig: () => TimeseriesChart.generateVegaSpec(this.props)
      }
    });
  }

  render() {
    const { removeMarker, range1Selection, chartDataLoaded, chartDataError, datasetId, render } = this.props;
    const { chartLoaded, vegaSpec } = this.state;

    // If for some reason, the range 1 is not selected or if the data
    // failed to load, we return
    // The 1st reason happens when restoring the state from the URL
    if (!range1Selection || chartDataError) return null;

    const canSave = !!getConfig().userToken;

    return (
      <div className="c-tool-timeseries-chart">
        {!chartLoaded &&
          <Spinner inner transparent={!chartDataLoaded} />
        }

        {render !== 'chart' &&
          <button
            type="button"
            className="close-button"
            aria-label="Close chart"
            onClick={removeMarker}
          >
            <Icon name="icon-cross" />
          </button>
        }

        {chartDataLoaded &&
          <VegaChart data={vegaSpec} reloadOnResize toggleLoading={loading => this.setState({ chartLoaded: !loading })} />
        }

        {chartDataLoaded && datasetId && canSave && render !== 'chart' && (
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

/* eslint-disable react/no-unused-prop-types */
TimeseriesChart.propTypes = {
  render: PropTypes.oneOf(['map', 'chart', undefined]),
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
/* estlint-enable react/no-unused-prop-types */

const mapStateToProps = state => ({
  render: state.nexgddptool.render,
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
