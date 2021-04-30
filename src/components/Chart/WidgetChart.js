import React from 'react';
import PropTypes from 'prop-types';
import { VegaChart } from 'widget-editor';

class WidgetChart extends React.Component {
  componentDidMount() {
    this.props.getWidgetBySlug(this.props.slug);
  }

  render() {
    if (this.props.data) {
      const widget = this.props.data[this.props.slug];
      if (widget && widget.widget_config) {
        return (
          <VegaChart data={widget.widget_config} reloadOnResize />
        );
      }
    }
    return null;
  }
}

WidgetChart.propTypes = {
  /**
   * Define the slug of the widget
   */
  slug: PropTypes.any.isRequired,
  /**
   * Define the function to get the widget slug data
   */
  getWidgetBySlug: PropTypes.func.isRequired,
  /**
   * Define the function to get the widget slug data
   */
  data: PropTypes.object,
  /**
   * Remove the min-height in component
   */
  small: PropTypes.bool
};

export default WidgetChart;
