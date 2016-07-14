import React from 'react';
import ContentCard from './ContentCard';
import VegaChart from '../commons/VegaChart';

function ChartCard(props) {
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
      {props.data && props.data.json_spec &&
        <VegaChart data={JSON.parse(JSON.stringify(props.data.json_spec))} />
      }
    </ContentCard>
  );
}

ChartCard.propTypes = {
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

export default ChartCard;
