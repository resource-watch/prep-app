import React from 'react';
import PropTypes from 'prop-types';
import ContentCard from './ContentCard';
import IFrame from '../IFrame';

class EmbedCard extends React.Component {
  setShareModal() {
    this.props.setShareModal(this.props.url, 'widget', this.props.data.slug);
  }

  render() {
    const header = {
      title: this.props.data.title,
      subtitle: this.props.data.subtitle
    };
    const downloadUrl = this.props.data.data_url || false;

    return (
      <ContentCard
        inner
        floatAttribution
        header={header}
        link={this.props.link}
        downloadUrl={downloadUrl}
        dashboardSlug={this.props.dashboardSlug}
        autoHeight={this.props.autoHeight}
        attribution={this.props.data.attribution}
        noBorder={this.props.noBorder}
        share={typeof this.props.setShareModal === 'function'}
        setShareModal={() => this.setShareModal()}
      >
        {this.props.url ?
          <IFrame src={this.props.url} /> :
          <p style={{ paddingLeft: '60px' }}>Data url not given.</p>
        }
      </ContentCard>
    );
  }
}

EmbedCard.propTypes = {
  /**
   * Define it the card has border
   */
  noBorder: PropTypes.bool,
  /**
   * Define widget data details
   */
  data: PropTypes.any.isRequired,
  /**
   * Define url to embed
   */
  url: PropTypes.string.isRequired,
  /**
   * Define it the card has link
   */
  link: PropTypes.string,
  /**
   * Set share modal state
   */
  setShareModal: PropTypes.func
};

export default EmbedCard;
