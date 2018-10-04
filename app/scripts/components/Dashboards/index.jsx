import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { logEvent } from 'helpers/analytics';
import Card from '../Cards/Card';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Icon from '../ui/Icon';
import DashboardsFilters from 'components/dashboards-filters';

class DashboardsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { createDashboardModalOpen: false };
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.getDashboardList();
    }
  }

  getContent() {
    if (!this.props.loaded) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

    if (!this.props.data.length) {
      return (
        <div className="columns small-12 medium-12 no-results">
          No results
        </div>
      );
    }

    const items = this.props.data.map((item, index) => (
      <div
        className={`columns small-10 medium-5 align-stretch ${index % 2 === 0 ? 'small-offset-1' : ''}`}
        key={item.slug}
        style={{ display: 'flex' }}
      >
        <Card border="neutral">
          <h3>
            <a href={`/dashboards/${item.slug}`}>
              {item.title}
            </a>
          </h3>
          <p>
            {item.summary}
          </p>
          { !item.partner && item.author && item.author.logo && item.author.logo !== '/logos/original/missing.png' && (
            <a
              href={item.author.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={config.assetsUrl + item.author.logo}
                className="logo"
                alt={item.author.name}
              />
            </a>
          )}

          {item.partner && (
            <a
              href={item.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logEvent('Dashboards', 'Clicks on a partner logo', item.partner.name)}
            >
              <img
                src={config.assetsUrl + item.partner.logo}
                className="logo"
                alt={item.partner.name}
              />
            </a>
          )}

          {!item.attribution && item.author && item.author.name && (
            <span className="attribution">
              {item.author.name}
            </span>
          )}

          {item.attribution && (
            <span className="attribution">
              {item.attribution}
            </span>
          ) }
        </Card>
      </div>
    ));

    return (
      <div className="row align-stretch">
        {items}
      </div>
    );
  }

  render() {
    const content = this.getContent();

    return (
      <div className="l-dashboards">
        <div className="sliced" />
        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <div className="c-toolbar-actions">
                <div />
                <div className="action">
                  <a href="/myprep/dashboards" className="c-button -alternative -action">
                    <Icon name="icon-share" className="-medium" />
                    Create Your Own Dashboard
                  </a>
                </div>
              </div>
              <h2>Collections of communities’ data, indicators, stories and tools for
                climate resilience
              </h2>
              <p>This is a selection of initial dashboards developed by members of the PREP community. Partners are in the process of developing additional dashboards and we welcome hearing from groups interested in developing their own.</p>
            </div>
          </div>
        </article>

        <DashboardsFilters />

        {content}

      </div>
    );
  }
}

DashboardsPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: PropTypes.string,
  /**
   * Define function to get the dashboard list
   */
  getDashboardList: PropTypes.func.isRequired,
  /**
   * Define dashboards list data
   */
  data: PropTypes.array,
  /**
   * Whether the list of dashboards has loaded
   */
  loaded: PropTypes.bool.isRequired
};

export default DashboardsPage;
