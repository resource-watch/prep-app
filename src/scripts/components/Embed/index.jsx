import React from 'react';
import { Link } from 'react-router';
import ChartCard from '../Cards/ChartCard';


class EmbedDetail extends React.Component {

  componentWillMount() {
    if (!this.props.data) {
      this.props.getWidgetBySlug(this.props.slug);
    }
  }

  getContent(data) {
    let content = [];

    if ( !data.widget_type || data.widget_type === 'Chart' ) {
      return (
        <div className="columns small-12 medium-12">
          <ChartCard
            tooltip
            title={data.title}
            subtitle={data.subtitle}
            data={data}
          />
        </div>
      );
    } else {
      return (
        <div>Embed</div>
      );
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        { data ? this.getContent(data) : ''}
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
