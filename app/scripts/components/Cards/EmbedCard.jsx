import React from 'react';
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

    return (
      <ContentCard
        inner
        floatAttribution
        header={header}
        link={this.props.link}
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
  noBorder: React.PropTypes.bool,
  /**
   * Define widget data details
   */
  data: React.PropTypes.any.isRequired,
  /**
   * Define url to embed
   */
  url: React.PropTypes.string.isRequired,
  /**
   * Define it the card has link
   */
  link: React.PropTypes.string,
  /**
   * Set share modal state
   */
  setShareModal: React.PropTypes.func
};

export default EmbedCard;
