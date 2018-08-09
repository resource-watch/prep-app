import React from 'react';
import PropTypes from 'prop-types';
import ContentCard from './ContentCard';
import SimpleMap from '../../containers/SimpleMap/SimpleMap';

class MapCard extends React.Component {
  setShareModal() {
    this.props.setShareModal(this.props.layerId, 'widget', this.props.data.slug);
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
        dashboardSlug={this.props.dashboardSlug}
        downloadUrl={downloadUrl}
        attribution={this.props.data.attribution}
        noBorder={this.props.noBorder}
        share={typeof this.props.setShareModal === 'function'}
        setShareModal={() => this.setShareModal()}
      >
        {this.props.layerId ?
          <SimpleMap layerId={this.props.layerId} /> :
          <p style={{ paddingLeft: '60px' }}>Layer id not given.</p>
        }
      </ContentCard>
    );
  }
}

MapCard.propTypes = {
  /**
  * Define it the card has border
  */
  noBorder: PropTypes.bool,
  /**
   * Define the card data
   */
  data: PropTypes.any.isRequired,
  /**
   * Define layer id to add in map
   */
  layerId: PropTypes.string.isRequired,
  /**
   * Define it the card has link
   */
  link: PropTypes.string,
  /**
   * Set share modal state
   */
  setShareModal: PropTypes.func
};

export default MapCard;
