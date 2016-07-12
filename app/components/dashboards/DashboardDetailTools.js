import React from 'react';
import Card from '../cards/Card';
import Title from '../commons/Title';

function DashboardDetailIndicators(props) {
  let content = [];
  if (props.data) {
    props.data.forEach((card, index) => {
      content.push(
        <Card border="neutral" key={`card-${index}`}>
          <a target="_blank" href={card.url}>
            <Title type="content">
              {card.title}
            </Title>
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

DashboardDetailIndicators.propTypes = {
  /**
   * Define dashboard indicators data
   */
  data: React.PropTypes.any.isRequired
};

export default DashboardDetailIndicators;
