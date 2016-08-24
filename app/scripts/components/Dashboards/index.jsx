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
        <div className="columns small-12 medium-6 align-stretch"
          key={`dashboard-item-${index}`}
          style={{display: 'flex'}}
        >
          <Card border="neutral">
            <h3>
              <Link to={`/dashboard/${item.slug}`}>
               {item.title}
              </Link>
            </h3>
            <p>
              {item.summary}
            </p>
            {item.partner &&
              <a href={item.partner.url} target="_blank">
                <img
                  src={config.apiUrl + item.partner.logo_medium}
                  className="logo"
                  alt={item.partner.name}
                />
              </a>
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
