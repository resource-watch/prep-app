import React from 'react';
import ContentCard from './ContentCard';
import VegaChart from '../Chart/VegaChart';

class ChartCard extends React.Component {
  setShareModal() {
    this.props.setShareModal(this.props.data.data_url, 'widget', this.props.data.slug);
  }

  render() {
    const header = {
      title: this.props.title,
      subtitle: this.props.subtitle,
      legend: this.props.legend
    };
    const downloadUrl = this.props.data.data_url || false;

    return (
      <ContentCard
        header={header}
        link={this.props.link}
        dashboardSlug={this.props.dashboardSlug}
        downloadUrl={downloadUrl}
        attribution={this.props.data.attribution}
        size={this.props.size}
        noBorder={this.props.noBorder}
        background={this.props.background}
        share={typeof this.props.setShareModal === 'function'}
        setShareModal={() => this.setShareModal()}
        noMargin={this.props.noMargin}
      >
        {this.props.data && this.props.data.widget_config &&
          <VegaChart data={this.props.data.widget_config} />
        }
      </ContentCard>
    );
  }
}

ChartCard.propTypes = {
  /**
   * Define the card legend
   */
  legend: React.PropTypes.string,
  /**
   * Define the card size
   */
  size: React.PropTypes.string,
  /**
   * Define it the card has tooltip
   */
  tooltip: React.PropTypes.bool,
  /**
   * Define it the card has default background color
   */
  background: React.PropTypes.bool,
  /**
   * Define it the card has border
   */
  noBorder: React.PropTypes.bool,
  /**
   * Define it the card has link
   */
  link: React.PropTypes.string,
  /**
   * Define layers data to the map
   */
  data: React.PropTypes.any.isRequired,
  /**
   * Set share modal state
   */
  setShareModal: React.PropTypes.func
};

export default ChartCard;
