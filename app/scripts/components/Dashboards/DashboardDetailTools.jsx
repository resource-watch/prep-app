import React from 'react';
import Card from '../Cards/Card';

function DashboardDetailTools(props) {
  return (
    props.data.length
      ? <div className="row align-stretch">
        {props.data.map((card, index) => (
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

              {card.partner &&
              <a target="_blank" href={card.partner.href}>
                <img
                  src={config.assetsUrl + card.partner.images.logo}
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
            <p>There are no tools associated with this dashboard yet.</p>
          </div>
        </div>
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
