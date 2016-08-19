import React from 'react';
import Card from '../Cards/Card';

function DashboardDetailTools(props) {
  let content = [];
  if (props.data) {
    props.data.forEach((card, index) => {
      content.push(
        <div className="columns small-12 medium-6" key={`tool-card-${index}`}>
          <Card border="neutral">
            <h3>
              <a target="_blank" href={card.url}>
                {card.title}
              </a>
              </h3>
            <p>
              {card.summary}
            </p>

            <a target="_blank" href={card.url}>
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
