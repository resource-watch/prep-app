import React from 'react';
import { Link } from 'react-router';
import { logEvent } from 'helpers/analytics';
import Card from '../Cards/Card';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Icon from '../ui/Icon';

class DashboardsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { createDashboardModalOpen: false };
  }

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getDashboardList();
    }
  }

  getContent() {
    if (!this.props.data || this.props.data.length === 0) {
      return (
        <div>
          <LoadingSpinner />
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
          {item.partner &&
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
          }
          {item.attribution &&
            <span className="attribution">{item.attribution}</span>
          }
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
        <article className="c-article -no-border">
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

        {content}

      </div>
    );
  }
}

DashboardsPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define function to get the dashboard list
   */
  getDashboardList: React.PropTypes.func.isRequired,
  /**
   * Define dashboards list data
   */
  data: React.PropTypes.array
};

export default DashboardsPage;
