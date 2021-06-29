import React from 'react';
import PropTypes from 'prop-types';
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
                <a target="_blank" href={card.url} rel="noreferrer">
                  {card.title}
                </a>
              </h3>
              <p>
                {card.summary}
              </p>

              {card.partner &&
              <a target="_blank" href={card.partner.href} rel="noreferrer">
                <img
                  src={process.env.REACT_APP_ASSETS_URL + card.partner.logo}
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
  data: PropTypes.any.isRequired
};

export default DashboardDetailTools;
