import React from 'react';
import PropTypes from 'prop-types';
import Vega from '../vega-chart/Vega';

const chartSpec = {
  "width": 700,
  "height": 300,
  "padding": {"top": 10, "left": 10, "bottom": 30, "right": 20},
  "data": [
    {
      "name": "table",
      "format":{
        "parse":{"date":"date" }
      },
      "values":[
    {
      "q25": 282.878,
      "q50": 290.087,
      "q75": 301.295,
      "date": "1950-01-01T00:00:00.000Z",
      "scenario": "historic"
    },
    {
      "q25": 282.923,
      "q50": 290.137,
      "q75": 301.35,
      "date": "1960-01-01T00:00:00.000Z",
      "scenario": "historic"
    },
    {
      "q25": 282.968,
      "q50": 290.187,
      "q75": 301.405,
      "date": "1970-01-01T00:00:00.000Z",
      "scenario": "historic"
    },
    {
      "q25": 283.013,
      "q50": 290.237,
      "q75": 301.46,
      "date": "1980-01-01T00:00:00.000Z",
      "scenario": "historic"
    },
    {
      "q25": 283.058,
      "q50": 290.287,
      "q75": 301.515,
      "date": "1990-01-01T00:00:00.000Z",
      "scenario": "historic"
    },
    {
      "q25": 283.103,
      "q50": 290.337,
      "q75": 301.57,
      "date": "2000-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.148,
      "q50": 290.387,
      "q75": 301.625,
      "date": "2010-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.193,
      "q50": 291.437,
      "q75": 301.68,
      "date": "2020-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.238,
      "q50": 291.587,
      "q75": 301.735,
      "date": "2030-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.283,
      "q50": 291.637,
      "q75": 301.79,
      "date": "2040-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.328,
      "q50": 291.787,
      "q75": 301.845,
      "date": "2050-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.373,
      "q50": 292.637,
      "q75": 301.9,
      "date": "2060-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.418,
      "q50": 292.687,
      "q75": 301.955,
      "date": "2070-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.463,
      "q50": 292.737,
      "q75": 302.01,
      "date": "2080-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 283.508,
      "q50": 294.787,
      "q75": 302.065,
      "date": "2090-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    },
    {
      "q25": 285.553,
      "q50": 295.837,
      "q75": 302.12,
      "date": "2100-01-01T00:00:00.000Z",
      "scenario": "rcp45"
    }
  ],
      "transform":[
        
        ]
    },
    {"name":"test",
      "source":"table",
      "transform":[
        {"type": "filter", "test": "datum.date >= datetime(1999,1,1) && datum.date <= datetime(2010,1,1) "}
        ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "time",
      "range": "width",
      "zero": false,
      "domain": {"data": "table", "field": "date"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "zero": true,
      "nice": true,
      "domain": {
         "fields": [
        {"data": "table", "field": "q75"},
        {"data": "table", "field": "q25"}]}
    }
  ],
  "axes": [
    {"type": "x", "scale": "x"}
  ],
  "marks": [
    {
      "type": "area",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x", "field": "date"},
          "y": {"scale": "y", "field": "q75"},
          "y2": {"scale": "y", "field": "q25"},
          "fill": {"value": "grey"}
        },
        "update": {
          "fillOpacity": {"value": 0.3}
        },
        "hover": {
          "fillOpacity": {"value": 0.1}
        }
      }
    },
     {
      "type": "line",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x", "field": "date"},
          "y": {"scale": "y", "field": "q50"},
          "stroke": {"value": "red"}
        },
        "update": {
          "strokeOpacity": {"value": 1}
        },
        "hover": {
          "strokeOpacity": {"value": 0.5}
        }
      }
     },
     {
      "type": "area",
      "from": {"data": "test"},
      "properties": {
        "enter": {
          "interpolate": {"value": "monotone"},
          "x": {"scale": "x", "field": "date"},
          "y": {"scale": "y", "field": "q75"},
          "y2": {"scale": "y", "field": "q25"},
          "fillOpacity": {"value": 0},
          "strokeOpacity": {"value": 1},
          "stroke": {"value": "yellow"}
        }
      }
    }
  ]
};

const TimeseriesChart = ({ width, height }) => (
  <Vega width={width} height={height} spec={chartSpec} />
);

TimeseriesChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  spec: PropTypes.object
};

TimeseriesChart.defaultProps = {
  width: 1072,
  height: 440
};

export default TimeseriesChart;