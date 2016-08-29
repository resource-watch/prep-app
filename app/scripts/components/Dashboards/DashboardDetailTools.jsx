import React from 'react';
import Card from '../Cards/Card';

function DashboardDetailTools(props) {
  let content = [];
  if (props.data.length) {
    props.data.forEach((card, index) => {
      content.push(
        <div
          className="columns small-12 medium-6"
          key={`tool-card-${index}`}
          style={{ display: 'flex' }}
        >
          <Card border="neutral">
            <h3>
              <a target="_blank" href={card.url}>
                {card.title}
              </a>
            </h3>
            <p>
              {card.summary}
            </p>

            {card.attribution &&
              <span className="attribution">{card.attribution}</span>
            }
          </Card>
        </div>
      );
    });
  } else {
    content = (<div className="column small-12"><p>There is no tools associated with that dashboard yet</p></div>);
  }

  return (
    <div className="row align-stretch">
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
