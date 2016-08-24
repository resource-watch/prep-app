import React from 'react';

function ContentCard(props) {
  let legend;

  if (props.header.legend) {
    legend = <span className="legend">{props.header.legend}</span>;
  }

  let subtitle;
  if (props.header.subtitle) {
    subtitle = <span className="legend">{props.header.subtitle}</span>;
  }

  return (
    <div className={['c-content-card', props.noBorder ? '-no-border' : ''].join(' ')}>
      <div className="header">
        {legend}
        <h3> {props.header.title} </h3>
        {subtitle}
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

ContentCard.propTypes = {
  /**
   * Define the text below the title
   * Accepted values:
   * 	{
   *    title: [String],
   *    legend: [String, optional],
   *    subtitle: [String, optional]
   *  }
   */
  header: React.PropTypes.object.isRequired,
  /**
   * Define it the card has border
   */
  noBorder: React.PropTypes.bool,
  /**
   * Define tooltip content data
   */
  dataTooltip: React.PropTypes.any,
  /**
   * Define the content of the card
   * Required
   */
  children: React.PropTypes.object
};

export default ContentCard;
