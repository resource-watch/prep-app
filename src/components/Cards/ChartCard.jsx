import React from 'react';
import PropTypes from 'prop-types';
import { VegaChart } from 'widget-editor';
import ContentCard from './ContentCard';

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
          <VegaChart data={this.props.data.widget_config} reloadOnResize />
        }
      </ContentCard>
    );
  }
}

ChartCard.propTypes = {
  /**
   * Define the card legend
   */
  legend: PropTypes.string,
  /**
   * Define the card size
   */
  size: PropTypes.string,
  /**
   * Define it the card has tooltip
   */
  tooltip: PropTypes.bool,
  /**
   * Define it the card has default background color
   */
  background: PropTypes.bool,
  /**
   * Define it the card has border
   */
  noBorder: PropTypes.bool,
  /**
   * Define it the card has link
   */
  link: PropTypes.string,
  /**
   * Define layers data to the map
   */
  data: PropTypes.any.isRequired,
  /**
   * Set share modal state
   */
  setShareModal: PropTypes.func
};

export default ChartCard;
