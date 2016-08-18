import React from 'react';
import { Link } from 'react-router';
import Card from '../Cards/Card';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
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

    let items = [];
    this.props.data.forEach((item, index) => {
      items.push(
        <div className="columns small-12 medium-6" key={`dashboard-item-${index}`}>
          <Card border="neutral" key={`dashboard-item-${index}`}>
            <Link to={`/dashboards/${item.slug}`}>
              <h3> {item.title} </h3>
            </Link>
            <p className="content">
              {item.summary}
            </p>
            {item.partner &&
              <a href="#">
                <img
                  src={config.apiUrl + item.partner.logo}
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
      <div className="row">
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
