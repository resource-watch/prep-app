import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';

function DashboardDetailInsights(props) {
  return (
    props.data.length
    ? <div className="row align-stretch">
      {props.data.map((card, index) => (
        <div className="columns small-12 medium-6" key={`insight-card-${index}`} style={{ display: 'flex' }} >
          <Card border="neutral">
            <h3>
              <Link to={`/insight/${card.slug}`}>
                {card.title}
              </Link>
            </h3>
            <p>
              {card.summary}
            </p>

            {card.partner &&
              <a target="_blank" href={card.partner.href}>
                <img
                  src={config.apiUrl + card.partner.images.logo}
                  className="logo"
                  alt={card.partner.name}
                />
              </a>
            }
            {card.attribution &&
              <span className="attribution">{card.attribution}</span>
            }
          </Card>
        </div>
      ))}
    </div>
    : <div className="c-article">
      <div className="row align-center">
        <div className="column small-12 medium-8">
          <p>There are no insights associated with this dashboard yet.</p>
        </div>
      </div>
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
