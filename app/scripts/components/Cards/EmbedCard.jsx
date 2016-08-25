import React from 'react';
import ContentCard from './ContentCard';
import IFrame from '../IFrame';

class EmbedCard extends React.Component {

  setShareModal() {
    this.props.setShareModal(this.props.data.data_url, 'widget', this.props.data.slug);
  }

  render() {
    const header = {
      title: this.props.title,
      subtitle: this.props.subtitle
    };

    return (
      <ContentCard
        noBorder={this.props.noBorder}
        header={header}
        dataTooltip={this.props.tooltip && this.props.data}
        setShareModal={() => this.setShareModal()}
      >
        { this.props.data && this.props.data.data_url ?
          <IFrame src={ this.props.data.data_url } /> :
          <p style={{paddingLeft: '60px' }}>Data url not given.</p>
        }
      </ContentCard>
    );
  }
}

EmbedCard.propTypes = {
  /**
   * Define the card title
   */
  title: React.PropTypes.string.isRequired,
  /**
   * Define the card subtitle
   */
  subtitle: React.PropTypes.string,
  /**
   * Define it the card has tooltip
   */
  tooltip: React.PropTypes.bool,
  /**
   * Define it the card has border
   */
  noBorder: React.PropTypes.bool,
  /**
   * Define layers data to the map
   */
  data: React.PropTypes.any.isRequired,
  /**
   * Set share modal state
   */
  setShareModal: React.PropTypes.func
};

export default EmbedCard;
