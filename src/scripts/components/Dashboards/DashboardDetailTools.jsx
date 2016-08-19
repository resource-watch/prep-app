import React from 'react';
import Card from '../Cards/Card';

function DashboardDetailTools(props) {
  let content = [];
  if (props.data) {
    props.data.forEach((card, index) => {
      content.push(
        <div className="columns small-12 medium-6" key={`tool-card-${index}`}>
          <Card border="neutral">
            <a target="_blank" href={card.url}>
              <h3> {card.title} </h3>
            </a>
            <p className="content">
              {card.summary}
            </p>

            <a className="link" target="_blank" href={card.url}>
              Read more
            </a>
          </Card>
        </div>
      );
    });
  }
  return (
    <div className="row">
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
