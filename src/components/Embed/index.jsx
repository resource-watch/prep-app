import React from 'react';
import PropTypes from 'prop-types';
import ChartCard from '../Cards/ChartCard';
import EmbedCard from '../Cards/EmbedCard';
import MapCard from '../Cards/MapCard';


class EmbedDetail extends React.Component {
  componentWillMount() {
    if (!this.props.data) {
      this.props.getWidgetBySlug(this.props.slug);
    }
  }

  getContent(data) {
    if (data.widget_config) {
      const widgetConfig = typeof data.widget_config === 'string'
        ? JSON.parse(data.widget_config)
        : data.widget_config;
      if (widgetConfig.type === 'map') {
        return (
          <div className="row large-12">
            <MapCard
              data={data}
              layerId={widgetConfig.layerId}
            />
          </div>
        );
      } else if (widgetConfig.type === 'embed') {
        return (
          <div className="row large-12">
            <EmbedCard
              data={data}
              url={widgetConfig.url}
            />
          </div>
        );
      }
    }
    return (
      <div className="row">
        <div className="columns small-12 medium-12">
          <ChartCard
            title={data.title}
            subtitle={data.subtitle}
            data={data}
            noBorder
          />
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {data && this.getContent(data)}
      </div>
    );
  }
}

EmbedDetail.propTypes = {
  /**
   * Define the slug of the widget
   */
  slug: PropTypes.string.isRequired,
  /**
   * Define the function to get the widget detail data
   */
  getWidgetBySlug: PropTypes.func.isRequired,
  /**
   * Define the dataset data
   */
  data: PropTypes.any
};

export default EmbedDetail;
