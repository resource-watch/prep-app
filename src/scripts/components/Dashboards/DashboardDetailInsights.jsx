import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';

function DashboardDetailInsights(props) {
  const content = props.data.map((card, index) => (
    <div className="columns small-12 medium-6" key={`insight-card-${index}`}>
      <Card border="neutral">
        <h3>
          <Link to={`/insights/${card.slug}`}>
            {card.title}
          </Link>
        </h3>
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
    </div>
  ));

  return (
    <div className="row">
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
