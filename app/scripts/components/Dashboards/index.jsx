import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';
import LoadingSpinner from '../Loading/LoadingSpinner';

class DashboardsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createDashboardModalOpen: false
    };
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

    const items = this.props.data.map((item, index) => {
      return (
        <div
          className={`columns small-10 medium-5 align-stretch ${index % 2 === 0 ? 'small-offset-1' : ''}`}
          key={`dashboard-item-${index}`}
          style={{ display: 'flex' }}
        >
          <Card border="neutral">
            <h3>
              <Link to={`/dashboard/${item.slug}/data`}>
                {item.title}
              </Link>
            </h3>
            <p>
              {item.summary}
            </p>
            {item.partner &&
            <a href={item.partner.url} target="_blank">
              <img
                src={config.apiUrl + item.partner.images.logo}
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
      );
    });

    return (
      <div className="row align-stretch">
        {items}
      </div>
    );
  }

  render() {
    let content = this.getContent();

    return (
      <div className="l-dashboards">
        <div className="sliced"></div>
        <article className="c-article -no-border">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Find collections of data, insights and tools that communities and organizations 
                find important for managing climate risk
              </h2>
              <p>This is a list of initial dashboards for the beta version of the PREP Platform. In PREP’s next phase, any user will be able to <Link to="/create">create</Link> and share their own dashboards and insights.</p>
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
