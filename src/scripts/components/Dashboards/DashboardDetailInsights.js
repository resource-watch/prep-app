import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';

function DashboardDetailInsights(props) {
  const content = props.data.map((card, index) => (
    <Card border="neutral" key={`card-${index}`}>
      <Link to={`/insights/${card.slug}`}>
        <h2> {card.title} </h2>
      </Link>
      <p className="content">
        {card.summary}
      </p>

      {card.partner &&
        <a target="_blank" href={card.partner.href}>
          <img
            src={config.apiUrl + card.partner.logo}
            className="logo"
            alt={card.partner.name}
          />
        </a>
      }
    </Card>
  ));

  return (
    <div className="cards">
      {content}
    </div>
  );
}

DashboardDetailInsights.propTypes = {
  /**
   * Define dashboard indicators data
   */
  data: React.PropTypes.array.isRequired
};

export default DashboardDetailInsights;
