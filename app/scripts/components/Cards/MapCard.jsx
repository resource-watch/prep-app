import React from 'react';
import ContentCard from './ContentCard';
import SimpleMap from '../../containers/Map/SimpleMap';

class MapCard extends React.Component {

  setShareModal() {
    this.props.setShareModal(this.props.layerId, 'widget', this.props.data.slug);
  }

  render() {
    const header = {
      title: this.props.data.title,
      subtitle: this.props.data.subtitle
    };

    return (
      <ContentCard
        inner
        header={header}
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
  noBorder: React.PropTypes.bool,
  /**
   * Define the card data
   */
  data: React.PropTypes.any.isRequired,
  /**
   * Define layer id to add in map
   */
  layerId: React.PropTypes.string.isRequired,
  /**
   * Set share modal state
   */
  setShareModal: React.PropTypes.func
};

export default MapCard;
