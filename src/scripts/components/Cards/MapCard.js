import React from 'react';
import ContentCard from './ContentCard';
import Map from '../maps/Map';

function MapCard(props) {
  const header = {
    title: props.title,
    legend: 'Map'
  };

  return (
    <ContentCard
      header={header}
      dataTooltip={props.tooltip ? props.data : false}
    >
      <Map data={props.data} />
    </ContentCard>
  );
}

MapCard.propTypes = {
  /**
   * Define the card title
   */
  title: React.PropTypes.string.isRequired,
  /**
   * Define it the card has tooltip
   */
  tooltip: React.PropTypes.bool,
  /**
   * Define layers data to the map
   */
  data: React.PropTypes.any.isRequired
};

export default MapCard;
