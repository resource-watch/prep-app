import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Vega from '../vega-chart/Vega';
import Icon from 'components/ui/Icon';
import './style.scss';

// Redux
import { setMarkerPosition } from 'actions/nexgddptool';

const chartSpec = {
  data: [
    {
      name: 'table',
      format: { parse: { date: 'date' } },
      values: [
        {
          q25: 282.878,
          q50: 290.087,
          q75: 301.295,
          date: '1950-01-01T00:00:00.000Z',
          scenario: 'historic'
        },
        {
          q25: 282.923,
          q50: 290.137,
          q75: 301.35,
          date: '1960-01-01T00:00:00.000Z',
          scenario: 'historic'
        },
        {
          q25: 282.968,
          q50: 290.187,
          q75: 301.405,
          date: '1970-01-01T00:00:00.000Z',
          scenario: 'historic'
        },
        {
          q25: 283.013,
          q50: 290.237,
          q75: 301.46,
          date: '1980-01-01T00:00:00.000Z',
          scenario: 'historic'
        },
        {
          q25: 283.058,
          q50: 290.287,
          q75: 301.515,
          date: '1990-01-01T00:00:00.000Z',
          scenario: 'historic'
        },
        {
          q25: 283.103,
          q50: 290.337,
          q75: 301.57,
          date: '2000-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.148,
          q50: 290.387,
          q75: 301.625,
          date: '2010-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.193,
          q50: 291.437,
          q75: 301.68,
          date: '2020-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.238,
          q50: 291.587,
          q75: 301.735,
          date: '2030-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.283,
          q50: 291.637,
          q75: 301.79,
          date: '2040-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.328,
          q50: 291.787,
          q75: 301.845,
          date: '2050-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.373,
          q50: 292.637,
          q75: 301.9,
          date: '2060-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.418,
          q50: 292.687,
          q75: 301.955,
          date: '2070-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.463,
          q50: 292.737,
          q75: 302.01,
          date: '2080-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 283.508,
          q50: 294.787,
          q75: 302.065,
          date: '2090-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        },
        {
          q25: 285.553,
          q50: 295.837,
          q75: 302.12,
          date: '2100-01-01T00:00:00.000Z',
          scenario: 'rcp45'
        }
      ]
    },
    {
      name: 'range1Data',
      source: 'table',
      transform: [
        {
          type: 'filter',
          test: 'datum.date >= range1.start && datum.date <= range1.end '
        }
      ]
    },
    {
      name: 'range2Data',
      source: 'table',
      transform: [
        {
          type: 'filter',
          test: 'range2 ? (datum.date >= range2.start && datum.date <= range2.end) : false'
        }
      ]
    }
  ],
  signals: [
    {
      name: 'range1Middle',
      init: {
        expr: '(+range1.start + +range1.end) / 2'
      }
    },
    {
      name: 'range1Label',
      init: {
        expr: "utcyear(range1.start) + '-' + utcyear(range1.end)"
      }
    },
    {
      name: 'range2Middle',
      init: {
        expr: 'range2 ? (+range2.start + +range2.end) / 2 : 0'
      }
    },
    {
      name: 'range2Label',
      init: {
        expr: "range2 ? utcyear(range2.start) + '-' + utcyear(range2.end) : ''"
      }
    }
  ],
  scales: [
    {
      name: 'x',
      type: 'time',
      range: 'width',
      zero: false,
      domain: { data: 'table', field: 'date' }
    },
    {
      name: 'y',
      type: 'linear',
      range: 'height',
      zero: true,
      nice: true,
      domain: {
        fields: [
          { data: 'table', field: 'q75' },
          { data: 'table', field: 'q25' }
        ]
      }
    }
  ],
  axes: [
    {
      type: 'x',
      scale: 'x',
      properties: {
        labels: {
          font: { value: 'Open Sans' },
          fontSize: { value: 10 },
          fill: { value: '#3B4F63' },
          opacity: { value: 0.7 }
        },
        axis: {
          stroke: { value: '#393F44' },
          opacity: { value: 0.3 }
        },
        ticks: {
          stroke: { value: '#393F44' },
          opacity: { value: 0.3 }
        }
      }
    }
  ],
  marks: [
    {
      type: 'area',
      from: { data: 'table' },
      properties: {
        enter: {
          interpolate: { value: 'monotone' },
          x: { scale: 'x', field: 'date' },
          y: { scale: 'y', field: 'q75' },
          y2: { scale: 'y', field: 'q25' },
          fill: { value: '#E9ECEE' }
        }
      }
    },
    {
      type: 'line',
      from: { data: 'table' },
      properties: {
        enter: {
          interpolate: { value: 'monotone' },
          x: { scale: 'x', field: 'date' },
          y: { scale: 'y', field: 'q50' },
          stroke: { value: '#263e57' },
          strokeWidth: { value: 2 },
          strokeDash: { value: [8, 8] }
        }
      }
    },
    {
      type: 'area',
      from: { data: 'range1Data' },
      properties: {
        enter: {
          interpolate: { value: 'monotone' },
          x: { scale: 'x', field: 'date' },
          y: { scale: 'y', field: 'q75' },
          y2: { scale: 'y', field: 'q25' },
          fillOpacity: { value: 0 },
          strokeOpacity: { value: 1 },
          stroke: { value: '#EFA600' },
          strokeWidth: { value: 2 }
        }
      }
    },
    {
      type: 'text',
      from: { data: 'range1Data', transform: [] },
      properties: {
        enter: {
          x: { scale: 'x', signal: 'range1Middle' },
          y: { scale: 'y', field: 'q75' },
          dy: { value: -10 },
          align: { value: 'center' },
          text: { template: '{{range1Label}}' },
          font: { value: 'Open Sans' },
          fontSize: { value: 13 },
          fontWeight: { value: 'bold' },
          fill: { value: '#EFA600' }
        }
      }
    },
    {
      type: 'area',
      from: { data: 'range2Data' },
      properties: {
        enter: {
          interpolate: { value: 'monotone' },
          x: { scale: 'x', field: 'date' },
          y: { scale: 'y', field: 'q75' },
          y2: { scale: 'y', field: 'q25' },
          fillOpacity: { value: 0 },
          strokeOpacity: { value: 1 },
          stroke: { value: '#EFA600' },
          strokeWidth: { value: 2 }
        }
      }
    },
    {
      type: 'text',
      from: { data: 'range2Data', transform: [] },
      properties: {
        enter: {
          x: { scale: 'x', signal: 'range2Middle' },
          y: { scale: 'y', field: 'q75' },
          dy: { value: -10 },
          align: { value: 'center' },
          text: { template: '{{range2Label}}' },
          font: { value: 'Open Sans' },
          fontSize: { value: 13 },
          fontWeight: { value: 'bold' },
          fill: { value: '#EFA600' }
        }
      }
    }
  ]
};

class TimeseriesChart extends React.PureComponent {
  render() {
    const { width, height, removeMarker, range1Selection, range2Selection } = this.props;

    const range1Signal = {
      name: 'range1',
      init: { expr: `{ start: datetime(${range1Selection.value}, 0, 1), end: datetime(${+range1Selection.value + 10}, 0, 1) }` }
    };

    const range2Signal = { name: 'range2', init: 'false' };
    if (range2Selection) {
      range2Signal.init = {
        expr: `{ start: datetime(${range2Selection.value}, 0, 1), end: datetime(${+range2Selection.value + 10}, 0, 1) }`
      };
    }

    const signals = [range1Signal, range2Signal, ...chartSpec.signals];

    // We create a new spec each time so the Vega component renders again
    // WARNING: it needs immutable data to detect the changes
    const spec = Object.assign({}, chartSpec, { signals });

    return (
      <div className="c-tool-timeseries-chart">
        <button type="button" className="close-button" aria-label="Close chart" onClick={removeMarker}>
          <Icon name="icon-cross" />
        </button>
        <Vega
          width={width}
          height={height}
          padding="strict"
          spec={spec}
        />
      </div>
    );
  }
}

TimeseriesChart.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  spec: PropTypes.object,
  removeMarker: PropTypes.func,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object
};

TimeseriesChart.defaultProps = {
  width: 'auto',
  height: 350
};

const mapStateToProps = state => ({
  range1Selection: state.nexgddptool.range1.selection,
  range2Selection: state.nexgddptool.range2.selection
});

const mapDispatchToProps = dispatch => ({
  removeMarker: () => dispatch(setMarkerPosition(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeseriesChart);
