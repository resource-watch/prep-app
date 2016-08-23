import React from 'react';
import ContentCard from './ContentCard';
import IFrame from '../IFrame';

function EmbedCard(props) {
  const header = {
    title: props.title,
    subtitle: props.subtitle
  };

  return (
    <ContentCard
      noBorder={props.noBorder}
      header={header}
      dataTooltip={props.tooltip && props.data}
    >
      { props.data && props.data.data_url ?
        <IFrame src={ props.data.data_url } /> :
        <p style={{paddingLeft: '60px' }}>Data url not given.</p>
      }
    </ContentCard>
  );
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
  data: React.PropTypes.any.isRequired
};

export default EmbedCard;
