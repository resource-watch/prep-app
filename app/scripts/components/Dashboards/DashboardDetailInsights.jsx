import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';

function DashboardDetailInsights(props) {
  const content = props.data.map((card, index) => (
    <div className="columns small-12 medium-6"
      key={`insight-card-${index}`} style={{display: 'flex'}}>
      <Card border="neutral">
        <h3>
          <Link to={`/insight/${card.slug}`}>
            {card.title}
          </Link>
        </h3>
        <p>
          {card.summary}
        </p>
        <p>
          {card.attribution}
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
    </div>
  ));

  return (
    <div className="row align-stretch">
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
