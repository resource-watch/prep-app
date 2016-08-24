import React from 'react';
import { Link } from 'react-router';
import ChartCard from '../Cards/ChartCard';
import EmbedCard from '../Cards/EmbedCard';


class EmbedDetail extends React.Component {

  componentWillMount() {
    if (!this.props.data) {
      this.props.getWidgetBySlug(this.props.slug);
    }
  }

  getContent(data) {
    if (data.widget_type && data.widget_type.name === 'Embed') {
      return (
        <div className="row large-12">
          <EmbedCard
            tooltip
            title={data.title}
            subtitle={data.subtitle}
            data={data}
            noBorder={true}
          />
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="columns small-12 medium-12">
            <ChartCard
              tooltip
              title={ data.title }
              subtitle={ data.subtitle}
              data={data}
              noBorder={true}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        { data && this.getContent(data) }
      </div>
    );
  }
}

EmbedDetail.propTypes = {
  /**
   * Define the slug of the widget
   */
  slug: React.PropTypes.string.isRequired,
  /**
   * Define the function to get the widget detail data
   */
  getWidgetBySlug: React.PropTypes.func.isRequired,
  /**
   * Define the dataset data
   */
  data: React.PropTypes.any
};

export default EmbedDetail;
