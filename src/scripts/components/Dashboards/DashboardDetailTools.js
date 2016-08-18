import React from 'react';
import Card from '../Cards/Card';

function DashboardDetailTools(props) {
  let content = [];
  if (props.data) {
    props.data.forEach((card, index) => {
      content.push(
        <Card border="neutral" key={`card-${index}`}>
          <a target="_blank" href={card.url}>
            <h2> {card.title} </h2>
          </a>
          <p className="content">
            {card.summary}
          </p>

          <a className="link" target="_blank" href={card.url}>
            Read more
          </a>
        </Card>
      );
    });
  }
  return (
    <div className="cards">
      {content}
    </div>
  );
}

DashboardDetailTools.propTypes = {
  /**
   * Define dashboard indicators data
   */
  data: React.PropTypes.any.isRequired
};

export default DashboardDetailTools;
